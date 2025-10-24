interface ProductsChartProps {
    week: string; // x axis
    products: number // y axis
}

const ProductsChart = ({ data }: { data: ProductsChartProps[] }) => {
    return (
        <div>Products Chart</div>
    );
}

export default ProductsChart;