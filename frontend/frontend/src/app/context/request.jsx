"use client"
import React, { createContext, useContext, useState } from "react";

const RequestContext = createContext(undefined);

export function RequestProvider({ children }) {
  const [requestedPosts, setRequestedPosts] = useState([]);

  const addRequest = (post) => {
    if (!requestedPosts.find((p) => p.id === post.id)) {
      setRequestedPosts((prev) => [...prev, post]);
    }
  };

  const removeRequest = (postId) => {
    setRequestedPosts((prev) => prev.filter((post) => post.id !== postId));
  };

  const isRequested = (postId) => {
    return requestedPosts.some((post) => post.id === postId);
  };

  return (
    <RequestContext.Provider
      value={{ requestedPosts, addRequest, removeRequest, isRequested }}
    >
      {children}
    </RequestContext.Provider>
  );
}

export function useRequests() {
  const context = useContext(RequestContext);
  if (context === undefined) {
    throw new Error("useRequests must be used within a RequestProvider");
  }
  return context;
}
