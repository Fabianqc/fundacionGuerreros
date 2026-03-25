import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { DoctorHorario } from './entities/doctor-horario.entity';
import { CreateDoctorHorarioDto } from './dto/create-doctor-horario.dto';
import { Doctor } from 'src/doctor/entities/doctor.entity';

@Injectable()
export class DoctorHorarioService {
  constructor(
    @InjectRepository(DoctorHorario)
    private readonly doctorHorarioRepository: Repository<DoctorHorario>,
  ) {}
  /// Reconstruir el DTO de horarios a partir de los slots individuales
  private readonly dayNames = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

  public reconstructDto(slots: DoctorHorario[]): CreateDoctorHorarioDto | null {
    if (!slots || slots.length === 0) return null;

    // Utilidades
    const formatTime = (t: string) => t?.toString().substring(0, 5) ?? "08:00";
    const formatDate = (d: Date) => {
      const dt = new Date(d);
      const y = dt.getFullYear();
      const m = String(dt.getMonth() + 1).padStart(2, '0');
      const day = String(dt.getDate()).padStart(2, '0');
      return `${y}-${m}-${day}`;
    };

    // ── 1. Agrupar datos generales ──
    const dayIndexCounts = new Map<number, number>();
    const dayTimeConfig = new Map<number, { startTime: string; endTime: string }>();
    const dayOfMonthCounts = new Map<number, number>();
    const dayOfMonthTimeConfig = new Map<number, { startTime: string; endTime: string }>();

    // Agrupar por semana (ISO week number) para detección quincenal
    const weekSlots = new Map<number, Set<number>>(); // weekNumber -> Set<dayIndex>

    slots.forEach(slot => {
      const date = new Date(slot.fecha);
      const dayIndex = date.getDay();
      const dayOfMonth = date.getDate();
      const weekNum = this.getWeekNumber(date);

      // Conteos por día de semana
      dayIndexCounts.set(dayIndex, (dayIndexCounts.get(dayIndex) || 0) + 1);
      if (!dayTimeConfig.has(dayIndex)) {
        dayTimeConfig.set(dayIndex, { startTime: formatTime(slot.hora_inicio), endTime: formatTime(slot.hora_fin) });
      }

      // Conteos por día del mes
      dayOfMonthCounts.set(dayOfMonth, (dayOfMonthCounts.get(dayOfMonth) || 0) + 1);
      if (!dayOfMonthTimeConfig.has(dayOfMonth)) {
        dayOfMonthTimeConfig.set(dayOfMonth, { startTime: formatTime(slot.hora_inicio), endTime: formatTime(slot.hora_fin) });
      }

      // Agrupar días activos por semana
      if (!weekSlots.has(weekNum)) weekSlots.set(weekNum, new Set());
      weekSlots.get(weekNum)!.add(dayIndex);
    });

    const totalSlots = slots.length;
    const maxDayReps = Math.max(...Array.from(dayIndexCounts.values()));
    const activeDayCount = dayIndexCounts.size;

    // Helper: construir arreglo semanal para el frontend  
    const buildWeeklyArray = (activeDays: Set<number>, timeMap: Map<number, { startTime: string; endTime: string }>) =>
      [1, 2, 3, 4, 5, 6, 0].map(index => {
        const isActive = activeDays.has(index);
        const config = timeMap.get(index);
        return {
          day: this.dayNames[index],
          dayIndex: index,
          isActive,
          startTime: config?.startTime ?? "08:00",
          endTime: config?.endTime ?? "17:00",
        };
      });

    // ── 2. Detectar BIWEEKLY ──
    // Si las semanas alternan entre dos conjuntos distintos de días activos
    if (totalSlots > 10 && weekSlots.size >= 4) {
      const weekEntries = Array.from(weekSlots.entries()).sort((a, b) => a[0] - b[0]);
      const oddWeekDays = new Set<number>();
      const evenWeekDays = new Set<number>();
      const oddTimeMap = new Map<number, { startTime: string; endTime: string }>();
      const evenTimeMap = new Map<number, { startTime: string; endTime: string }>();

      weekEntries.forEach(([weekNum, days], i) => {
        const target = i % 2 === 0 ? oddWeekDays : evenWeekDays;
        const tMap = i % 2 === 0 ? oddTimeMap : evenTimeMap;
        days.forEach(d => {
          target.add(d);
          if (!tMap.has(d)) tMap.set(d, dayTimeConfig.get(d)!);
        });
      });

      // Es quincenal si los dos conjuntos de días son diferentes
      const samePattern = oddWeekDays.size === evenWeekDays.size &&
        [...oddWeekDays].every(d => evenWeekDays.has(d));

      if (!samePattern) {
        return {
          type: 'biweekly',
          biweekly: {
            week1: buildWeeklyArray(oddWeekDays, oddTimeMap),
            week2: buildWeeklyArray(evenWeekDays, evenTimeMap),
          },
        } as unknown as CreateDoctorHorarioDto;
      }
    }

    // ── 3. Detectar MONTHLY ──
    // Un patrón mensual real tiene pocos días únicos del mes (ej: 2, 10, 23).
    // Un patrón semanal genera 25+ días únicos del mes, así que lo descartamos.
    const monthsSpanned = new Set(slots.map(s => new Date(s.fecha).getMonth())).size;
    const consistentMonthDays = Array.from(dayOfMonthCounts.entries()).filter(([, count]) => count >= 2);

    if (monthsSpanned >= 2 && consistentMonthDays.length > 0 && dayOfMonthCounts.size <= 15) {
      return {
        type: 'monthly',
        monthly: {
          days: consistentMonthDays
            .sort((a, b) => a[0] - b[0])
            .map(([day]) => ({
              day,
              startTime: dayOfMonthTimeConfig.get(day)?.startTime ?? "08:00",
              endTime: dayOfMonthTimeConfig.get(day)?.endTime ?? "17:00",
            })),
        },
      } as CreateDoctorHorarioDto;
    }

    // ── 4. Detectar WEEKLY ──
    if (totalSlots > 15 && maxDayReps >= 4) {
      const activeDays = new Set(dayIndexCounts.keys());
      return {
        type: 'weekly',
        weekly: buildWeeklyArray(activeDays, dayTimeConfig),
      } as CreateDoctorHorarioDto;
    }

    // ── 5. Fallback: SPECIFIC ──
    return {
      type: 'specific',
      specific: slots.map(slot => ({
        id: slot.id?.toString() || Date.now().toString(),
        date: formatDate(slot.fecha),
        startTime: formatTime(slot.hora_inicio),
        endTime: formatTime(slot.hora_fin),
      })),
    } as CreateDoctorHorarioDto;
  }


  ///crear horarios
  async create(createDoctorHorarioDto: CreateDoctorHorarioDto, doctor: Doctor, manager: EntityManager) {
    // Borrar todos los horarios existentes de este doctor antes de insertar los nuevos
    await manager.delete(DoctorHorario, { doctor: { id: doctor.id } });

    const slots: Partial<DoctorHorario>[] = [];
    const today = new Date();
    const endOfYear = new Date(today.getFullYear(), 11, 31);

    switch (createDoctorHorarioDto.type) {
      case 'specific':
        if (createDoctorHorarioDto.specific) {
          createDoctorHorarioDto.specific.forEach(s => {
            slots.push({
              doctor: doctor,
              fecha: new Date(s.date + 'T12:00:00'),
              hora_inicio: s.startTime,
              hora_fin: s.endTime,
            });
          });
        }
        break;

      case 'weekly':
        if (createDoctorHorarioDto.weekly) {
          const activeDays = createDoctorHorarioDto.weekly.filter(d => d.isActive);
          let current = new Date(today);
          while (current <= endOfYear) {
            const dayIndex = current.getDay();
            const config = activeDays.find(d => d.dayIndex === dayIndex);
            if (config) {
              slots.push({
                doctor: doctor,
                fecha: new Date(current),
                hora_inicio: config.startTime,
                hora_fin: config.endTime,
              });
            }
            current.setDate(current.getDate() + 1);
          }
        }
        break;

      case 'biweekly':
        if (createDoctorHorarioDto.biweekly) {
          const { week1, week2 } = createDoctorHorarioDto.biweekly;
          let current = new Date(today);
          const startWeek = this.getWeekNumber(today);

          while (current <= endOfYear) {
            const currentWeek = this.getWeekNumber(current);
            const isWeek1 = (currentWeek - startWeek) % 2 === 0;
            const activeDays = isWeek1 ? week1.filter(d => d.isActive) : week2.filter(d => d.isActive);
            
            const dayIndex = current.getDay();
            const config = activeDays.find(d => d.dayIndex === dayIndex);
            if (config) {
              slots.push({
                doctor: doctor,
                fecha: new Date(current),
                hora_inicio: config.startTime,
                hora_fin: config.endTime,
              });
            }
            current.setDate(current.getDate() + 1);
          }
        }
        break;

      case 'monthly':
        if (createDoctorHorarioDto.monthly) {
          let current = new Date(today.getFullYear(), today.getMonth(), 1);
          while (current <= endOfYear) {
            if (current >= today) {
                const config = createDoctorHorarioDto.monthly.days.find(d => Number(d.day) === current.getDate());
                if (config) {
                  slots.push({
                    doctor: doctor,
                    fecha: new Date(current),
                    hora_inicio: config.startTime,
                    hora_fin: config.endTime,
                  });
                }
            }
            current.setDate(current.getDate() + 1);
          }
        }
        break;
    }

    if (slots.length > 0) {
      await manager.save(DoctorHorario, slots);
    }
  }

  private getWeekNumber(d: Date): number {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
    return weekNo;
  }
}
