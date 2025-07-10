'use client';

import { useState } from 'react';
import '@/app/styles/a5q2.css';

interface User {
  id: number;
  name: string;
  email: string;
  // add other fields if needed
}

interface UserListProps {
  initialUsers?: User[];
  initialError?: string | null;
}

export default function UserList({ initialUsers = [], initialError = null }: UserListProps) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [error, setError] = useState<string | null>(initialError);
  const [loading, setLoading] = useState(false);

  const retryFetch = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!res.ok) throw new Error();
      const data: User[] = await res.json();
      setUsers(data);
    } catch {
      setError('Failed to load users. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="loading">Loading...</p>;

  if (error) {
    return (
      <div className="error-message">
        <p>{error}</p>
        <button className="retry-button" onClick={retryFetch}>Retry</button>
      </div>
    );
  }

  return (
    <div className="main-user">
      <ul className="user-list">
        {users.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong> - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
