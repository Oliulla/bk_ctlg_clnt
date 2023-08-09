export default function Footer() {
  return (
    <footer className="bg-gray-800 py-8 text-center text-white">
      <p>&copy; {'2022 - ' + new Date().getFullYear()} Book Catalog. All rights reserved.</p>
    </footer>
  );
}
