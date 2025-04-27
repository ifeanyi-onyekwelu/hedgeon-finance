'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { getProfileApi } from '@/app/api/userApi'

type User = {
    id: string
    email: string
    role: string
    isVerified: boolean
    name?: string  // Optional, if you need it occasionally
    walletBalance?: number
    netReturns?: number  // New field for net profit
    totalInvested?: number
}


type UserContextType = {
    user: User | null
    loading: boolean
    refreshUser: () => Promise<void>
}

const UserContext = createContext<UserContextType>({
    user: null,
    loading: true,
    refreshUser: async () => { }
})

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    const fetchUser = async () => {
        try {
            const res = await getProfileApi();
            if (!(res.status === 200)) throw new Error('Unauthorized')

            console.log(res.data['user'])
            setUser(res.data['user'])
        } catch (err) {
            console.log(err)
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])

    return (
        <UserContext.Provider value={{ user, loading, refreshUser: fetchUser }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext)
