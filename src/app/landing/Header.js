"use client";
import Link from "next/link";
import Button from "../components/Button";
import { useContext } from "react";
import { AppContext } from "../Wrapper/Context";

export default function Header() {
  const { auth } = useContext(AppContext);

  return (
    <header className="w-full py-4 px-6 bg-white shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/landing" className="flex items-center space-x-2">
          <img src="/logo.png" alt="Project Logo" className="w-12" />
          <span className="font-bold text-xl">DocInsights</span>
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link
            href="/landing/#features"
            className="text-gray-600 hover:text-gray-900"
          >
            Features
          </Link>
          <Link
            href="/landing/#hiw"
            className="text-gray-600 hover:text-gray-900"
          >
            How it's Works
          </Link>
          <Link
            href="/landing/#testimonials"
            className="text-gray-600 hover:text-gray-900"
          >
            Testimonials
          </Link>
          <Link
            href="/landing/#contact"
            className="text-gray-600 hover:text-gray-900"
          >
            Contact
          </Link>
        </nav>
        <div className="flex space-x-4">
          {!auth && (
            <Button variant="outline" asChild>
              <Link href="/Login">Login</Link>
            </Button>
          )}
          <Button
            asChild
            className={"hover:bg-slate-800 bg-slate-700 text-white"}
          >
            {!auth ? (
              <Link href="/sign-up">Get Started</Link>
            ) : (
              <Link href="/">Get Started</Link>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
