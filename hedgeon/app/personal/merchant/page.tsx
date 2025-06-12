"use client";

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useUser } from "@/context/UserContext"
import Link from "next/link"

const transactions = [
    { id: 1, amountRecorded: 5000, amountSent: 0, status: "Pending" },
    { id: 2, amountRecorded: 15000, amountSent: 15000, status: "Cleared" },
    { id: 3, amountRecorded: 8000, amountSent: 0, status: "Failed" },
]

const statusColorMap = {
    Pending: "bg-yellow-100 text-yellow-800",
    Cleared: "bg-green-100 text-green-800",
    Failed: "bg-red-100 text-red-800",
}

export default function MerchantDashboard() {
    const { user } = useUser();

    if (!user?.isMerchant) {
        return (
            <Card className="mt-6 max-w-xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-center text-lg">Become a Merchant</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                    <p className="text-muted-foreground">
                        You're currently not a registered merchant. Join our merchant program to track earnings, manage payouts, and grow with Hedgeon.
                    </p>
                    <Link href="merchant/apply">
                        <Button className="w-full">Apply as a Merchant</Button>
                    </Link>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="mt-6">
            <CardHeader>
                <CardTitle>Merchant Transactions</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Amount Recorded</TableHead>
                            <TableHead>Amount Sent</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {transactions.map((tx) => (
                            <TableRow key={tx.id}>
                                <TableCell>₦{tx.amountRecorded.toLocaleString()}</TableCell>
                                <TableCell>₦{tx.amountSent.toLocaleString()}</TableCell>
                                <TableCell>
                                    <Badge
                                        className={statusColorMap[tx.status as keyof typeof statusColorMap]}
                                        variant="outline"
                                    >
                                        {tx.status}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
