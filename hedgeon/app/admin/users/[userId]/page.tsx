import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, CheckCircle, Mail, Phone, User, Users, XCircle, Edit } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

// Mock Data (Replace with actual API calls)
const mockUser = {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1234567890',
    role: 'user',
    verified: true,
    createdAt: '2024-07-28',
    profilePicture: "https://github.com/shadcn.png",
    address: "123 Main St, Anytown, USA",
    dob: "1990-05-15",
};

const mockInvestments = [
    { id: '1', plan: 'Basic', amount: 1000, status: 'active', date: '2024-07-28' },
    { id: '2', plan: 'Premium', amount: 5000, status: 'completed', date: '2024-07-25' },
];

const mockKyc = {
    id: '1',
    status: 'verified',
    documentType: 'Passport',
    documentNumber: 'P1234567',
    submissionDate: '2024-07-28',
    documentImage: 'https://via.placeholder.com/150', // Replace with actual URL
};

const mockReferrals = [
    { id: '1', name: 'Jane Smith', email: 'jane.smith@example.com' },
    { id: '2', name: 'Bob Johnson', email: 'bob.johnson@example.com' },
];

const AdminUserDetailsPage = ({ userId }: { userId: string }) => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState<any>({});

    useEffect(() => {
        // Simulate API call
        const timer = setTimeout(() => {
            setUser(mockUser);
            setEditedUser(mockUser); // Initialize with current user data
            setLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, [userId]);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEditedUser((prev: any) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        // In a real app, you'd make an API call here to update the user data
        console.log('Saving user data:', editedUser);
        setUser(editedUser); // Update the displayed user data
        setIsEditing(false); // Exit edit mode
    };

    if (loading) {
        return <div className="p-6">Loading user details...</div>; // Improve with Skeleton
    }

    if (error) {
        return <div className="p-6 text-red-500">Error: {error}</div>;
    }

    if (!user) {
        return <div className="p-6">User not found.</div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-4 text-gray-800">User Details: {user.name}</h1>

            <Tabs defaultValue="profile" className="w-full">
                <TabsList className="mb-4">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="investments">Investments</TabsTrigger>
                    <TabsTrigger value="kyc">KYC</TabsTrigger>
                    <TabsTrigger value="referrals">Referrals</TabsTrigger>
                </TabsList>
                <TabsContent value="profile">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-12 w-12">
                                        <AvatarImage src={user.profilePicture} alt={user.name} />
                                        <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <CardTitle>{user.name}</CardTitle>
                                        <CardDescription>{user.email}</CardDescription>
                                    </div>
                                </div>
                                {isEditing ? (
                                    <div className="flex gap-2">
                                        <Button onClick={handleSave}>Save</Button>
                                        <Button variant="outline" onClick={handleEditToggle}>Cancel</Button>
                                    </div>
                                ) : (
                                    <Button onClick={handleEditToggle}><Edit className="mr-2 h-4 w-4" /> Edit</Button>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        value={isEditing ? editedUser.name : user.name}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        className={cn(isEditing ? "" : "bg-gray-100")}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={isEditing ? editedUser.email : user.email}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        className={cn(isEditing ? "" : "bg-gray-100")}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="phone">Phone</Label>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        value={isEditing ? editedUser.phone : user.phone}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        className={cn(isEditing ? "" : "bg-gray-100")}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="role">Role</Label>
                                    <Select
                                        onValueChange={(value) => handleInputChange({ target: { name: 'role', value } } as React.ChangeEvent<HTMLSelectElement>)}
                                        value={isEditing ? editedUser.role : user.role}
                                        disabled={!isEditing}
                                    >
                                        <SelectTrigger className={cn(isEditing ? "" : "bg-gray-100")}>
                                            <SelectValue placeholder="Select Role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="user">User</SelectItem>
                                            <SelectItem value="admin">Admin</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label htmlFor="dob">Date of Birth</Label>
                                    <Input
                                        id="dob"
                                        name="dob"
                                        type="date"
                                        value={isEditing ? editedUser.dob : user.dob}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        className={cn(isEditing ? "" : "bg-gray-100")}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="address">Address</Label>
                                    <Textarea
                                        id="address"
                                        name="address"
                                        value={isEditing ? editedUser.address : user.address}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        className={cn(isEditing ? "" : "bg-gray-100")}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-sm font-medium">Status</h3>
                                <Badge
                                    variant={user.verified ? 'secondary' : 'destructive'}
                                >
                                    {user.verified ? 'Verified' : 'Unverified'}
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="investments">
                    <Card>
                        <CardHeader>
                            <CardTitle>Investments</CardTitle>
                            <CardDescription>List of user&apos;s investments</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {mockInvestments.length > 0 ? (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Plan</TableHead>
                                            <TableHead>Amount</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Date</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {mockInvestments.map(inv => (
                                            <TableRow key={inv.id}>
                                                <TableCell>{inv.plan}</TableCell>
                                                <TableCell>${inv.amount}</TableCell>
                                                <TableCell>
                                                    <Badge variant={inv.status === 'active' ? 'secondary' : inv.status === 'completed' ? 'secondary' : 'destructive'}>
                                                        {inv.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>{inv.date}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            ) : (
                                <p>No investments found for this user.</p>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="kyc">
                    <Card>
                        <CardHeader>
                            <CardTitle>KYC Information</CardTitle>
                            <CardDescription>User&apos;s KYC details</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {mockKyc ? (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <span className="font-semibold">Status:</span>
                                            <Badge
                                                variant={mockKyc.status === 'verified' ? 'secondary' : 'destructive'}
                                                className="ml-2"
                                            >
                                                {mockKyc.status}
                                            </Badge>
                                        </div>
                                        <div>
                                            <span className="font-semibold">Document Type:</span> {mockKyc.documentType}
                                        </div>
                                        <div>
                                            <span className="font-semibold">Document Number:</span> {mockKyc.documentNumber}
                                        </div>
                                        <div>
                                            <span className="font-semibold">Submission Date:</span> {mockKyc.submissionDate}
                                        </div>
                                    </div>
                                    <div>
                                        <span className="font-semibold">Document Image:</span>
                                        <img src={mockKyc.documentImage} alt="KYC Document" className="mt-2 rounded-md max-w-full h-auto" />
                                    </div>
                                    <Button>Review KYC</Button> {/* Link to a detailed KYC review page */}
                                </>
                            ) : (
                                <p>No KYC information found for this user.</p>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="referrals">
                    <Card>
                        <CardHeader>
                            <CardTitle>Referrals</CardTitle>
                            <CardDescription>Users referred by this user</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {mockReferrals.length > 0 ? (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Email</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {mockReferrals.map(ref => (
                                            <TableRow key={ref.id}>
                                                <TableCell>{ref.name}</TableCell>
                                                <TableCell>{ref.email}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            ) : (
                                <p>No referrals found for this user.</p>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default AdminUserDetailsPage;