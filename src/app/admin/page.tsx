import { Card, Text, Metric } from "@tremor/react";
function Sidebar() {

    return (
        <Card className="max-w-xs mx-auto">
            <Text>Sales</Text>
            <Metric>$ 34,743</Metric>
        </Card>

    );
}

export default Sidebar;