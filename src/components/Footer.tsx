import { profile } from "@/data/resume";

export default function Footer() {
  return (
    <footer className="mx-auto w-full max-w-[1120px] px-5 sm:px-8 lg:px-[72px]">
      <div className="border-t border-line py-8 font-mono text-[0.72rem] text-faint">
        © {new Date().getFullYear()} {profile.name} · {profile.englishName}
      </div>
    </footer>
  );
}
