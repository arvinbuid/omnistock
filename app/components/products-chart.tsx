'use client'

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface ProductsChartProps {
    week: string; // x axis
    products: number // y axis
}

const ProductsChart = ({ data }: { data: ProductsChartProps[] }) => {
    return (
        <div className="h-48 w-full font-inter">
            <ResponsiveContainer width='100%' height={192}>
                <AreaChart data={data} margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="week" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                    <Area
                        type='monotone'
                        dataKey='products'
                        stroke="#6F2DA8" // grape hex code
                        fill="#6F2DA8"
                        fillOpacity={0.2}
                        strokeWidth={2}
                        dot={{ fill: '#6F2DA8', r: 3, strokeWidth: 2 }}
                        activeDot={{ fill: '#6F2DA8', r: 6, strokeWidth: 2 }}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "white",
                            border: "1px solid #e5e7eb",
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                        labelStyle={{ color: "374151", fontWeight: '600' }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}

export default ProductsChart;