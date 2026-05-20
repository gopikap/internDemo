import { useState } from "react";

export interface UserDetais {
  firstname: string;
  lastname: string;
}
interface HeroProps {
  name: string;
  title: string;
  bio: string;
  user: UserDetais;
}

const Hero = ({ name, title, bio, user }: HeroProps) => {
  // Derive initials from the name prop
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");
  const { firstname, lastname } = user;
  console.log("User details in Hero component:", { firstname, lastname });

  const [count, setCount] = useState<number>(0);

  function handleDownloadClick(
    event: React.MouseEvent<HTMLButtonElement>,
  ): void {
    setCount(count + 1);

    console.log(event.target);
    alert("Download CV clicked!" + count);
  }

  return (
    <section className="hero-section">
      <div className="hero-avatar">{initials}</div>
      <h1 className="hero-name">{name}</h1>
      <h2 className="hero-title">{title}</h2>
      <p className="hero-bio">{bio}</p>
      <div className="hero-actions">
        <button className="btn-primary" onClick={handleDownloadClick}>
          Download CV
        </button>
        <button className="btn-outline">Contact Me</button>
      </div>
    </section>
  );
};

export default Hero;
