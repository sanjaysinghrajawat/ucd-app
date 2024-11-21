import Link from "next/link";
import Button from "../components/Button";

export default function Footer() {
  return (
    <footer id="contact" className="bg-gray-900 text-white py-12 px-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <h3 className="text-xl font-bold mb-4">Stay Updated</h3>
          <form className="flex gap-2">
            <input type="email" placeholder="Enter Your Mail" className="bg-gray-200 rounded-sm p-2 w-1/3" />
            <Button type="submit" className={"bg-slate-800 hover:bg-slate-600"}>Subscribe</Button>
          </form>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/privacy">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/terms">Terms of Service</Link>
            </li>
            <li>
              <Link href="/contact">Contact Us</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto mt-8 text-center">
        <p>&copy; 2024 DocInsights. All rights reserved.</p>
      </div>
    </footer>
  );
}
