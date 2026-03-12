import { motion } from "framer-motion";

interface TableSkeletonProps {
    rows?: number;
    columns?: number;
}

export default function TableSkeleton({ rows = 5, columns = 4 }: TableSkeletonProps) {
    return (
        <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-h-[500px] animate-pulse">
            {/* Toolbar Skeleton */}
            <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="h-6 bg-gray-200 rounded-md w-48"></div>
                <div className="h-10 bg-gray-200 rounded-xl w-full md:w-80"></div>
            </div>

            {/* Table Header Skeleton */}
            <div className="w-full overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            {Array.from({ length: columns }).map((_, i) => (
                                <th key={`th-${i}`} className="px-6 py-4">
                                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {Array.from({ length: rows }).map((_, rowIndex) => (
                            <tr key={`tr-${rowIndex}`}>
                                {Array.from({ length: columns }).map((_, colIndex) => (
                                    <td key={`td-${rowIndex}-${colIndex}`} className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            {/* Simulate avatar on first column only */}
                                            {colIndex === 0 && <div className="w-10 h-10 bg-gray-200 rounded-full shrink-0"></div>}
                                            <div className="space-y-2 flex-1">
                                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                                {colIndex === 0 && <div className="h-3 bg-gray-200 rounded w-1/2"></div>}
                                            </div>
                                        </div>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            {/* Pagination Skeleton */}
            <div className="p-4 border-t border-gray-100 flex items-center justify-between">
                <div className="h-8 bg-gray-200 rounded w-32"></div>
                <div className="h-8 bg-gray-200 rounded w-48"></div>
            </div>
        </div>
    );
}
