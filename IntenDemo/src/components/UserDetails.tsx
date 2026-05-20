const UserDetails = ({
  firstname,
  lastname,
}: {
  firstname: string;
  lastname: string;
}) => {
  return (
    <section className="hero-section">
      <div className="hero-avatar">{firstname}</div>
      <div className="hero-avatar">{lastname}</div>
    </section>
  );
};

export default UserDetails;
