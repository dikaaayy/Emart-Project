import React from "react";

export default function Backdrop({ children, onClick }: any) {
  return (
    <div className="fixed top-0 left-0 z-20 flex h-full w-full items-center justify-center bg-black bg-opacity-40" onClick={onClick}>
      {children}
    </div>
  );
}
