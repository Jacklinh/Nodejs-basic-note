'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

interface CategoryNaviClientProps {
    children: React.ReactElement<{
        onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    }>;
}

export function CategoryNaviClient({ children }: CategoryNaviClientProps) {
    const router = useRouter();

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        if (value) {
            router.push(`/category/${value}`);
        }else {
            router.push('/');
        }
    };

    return React.cloneElement(children, {
        onChange: handleChange
    });
}