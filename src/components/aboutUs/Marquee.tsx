import Image from "next/image";
import Marquee from "react-fast-marquee";

function logoMarquee() {
  return (
    <section className="bg-gray-100 dark:bg-gray-800 py-10">
        <Marquee speed={40} gradient={false}>
          {Array(3)
            .fill([
              "69524",
              "69525",
              "69526",
              "69527",
              "69528"
            ])
            .flat()
            .map((id, i) => (
              <Image
                key={i}
                src={`https://cdn-icons-png.flaticon.com/512/69/${id}.png`}
                alt={`Icon ${i}`}
                height={12}
                width={34}
                className="h-12 mx-10"
              />
            ))}
        </Marquee>
      </section>
  )
}

export default logoMarquee