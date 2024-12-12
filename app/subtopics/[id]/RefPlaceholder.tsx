import { Card, Skeleton, Spacer } from "@nextui-org/react";

export default function RefPlaceholder() {
    return (
        <Card className="mx-auto bg-gray-100 space-y-5 p-4" radius="lg">
            <div className="space-y-3">
                <Skeleton className="w-3/5 rounded-lg">
                    <div className="h-3 w-3/5 rounded-lg" />
                </Skeleton>
                <Skeleton className="w-4/5 rounded-lg">
                    <div className="h-3 w-4/5 rounded-lg" />
                </Skeleton>
                <Skeleton className="w-2/5 rounded-lg">
                    <div className="h-3 w-2/5 rounded-lg" />
                </Skeleton>
            </div>
            <Spacer y={4} />
            <div className="space-y-1">
                <Skeleton className="w-1/12 rounded-lg ml-12">
                    <div className="h-3 w-2/5 rounded-lg" />
                </Skeleton>
                <Spacer y={4} />
                <Skeleton className="w-1/5 rounded-lg">
                    <div className="h-3 w-2/5 rounded-lg" />
                </Skeleton>
            </div>
        </Card>
    );
}
