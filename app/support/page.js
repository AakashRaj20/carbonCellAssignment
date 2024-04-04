import Image from "next/image";

const Support = () => {
  return (
    <div className="under-construction">
      <p className="text-color text-xl font-bold">
        Support page is Under Development, we Will notify once it is ready for
        your personlised experience.
      </p>
      <Image
        src="/images/underDevelopment.svg"
        alt="underDevelopment"
        width={600}
        height={600}
      />
    </div>
  );
};

export default Support;
