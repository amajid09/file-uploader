import { LogOut } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-secondary flex justify-between px-16 z-[-1] py-5">
      <div className="logo text-3xl font-semibold text-foreground">
        Document storage
      </div>
      <ul className="flex gap-6 items-center">
        <li className="text-foreground text-lg font-semibold">Username </li>
        <li className="text-foreground text-lg flex gap-2 items-center ">
          <span>
            <LogOut />
          </span>
          Logout
        </li>
      </ul>
    </header>
  );
}
