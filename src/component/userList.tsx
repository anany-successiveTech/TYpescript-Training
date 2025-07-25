"use client";

import React from "react";
import "@/app/styles/a5q11.css"

interface User {
  id: number;
  name: string;
  email: string;
}

interface UserListProps {
  data: User[];
}

export default function UserListWithData({ data }: UserListProps) {
  return (
    <div className="userListWrapper">
      <h2 className="userListTitle">User List</h2>
      <ul className="userList">
        {data.map((user) => (
          <li key={user.id} className="userListItem">
            <strong>{user.name}</strong> — {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
