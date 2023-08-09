import RecentBooks from "../components/RecentBooks";

export default function Home() {
  return (
    <div className="px-10 pb-10">
      <h2 className="font-bold text-3xl">Recent Trending 10 Books</h2>
      <RecentBooks />
    </div>
  );
}
