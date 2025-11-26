import React from 'react';

const About = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <section ref={ref} className="py-16 md:py-24 bg-white dark:bg-black">
      <div className="container mx-auto px-4 text-center max-w-3xl">
        <h2 className="font-orbitron text-4xl md:text-5xl font-bold uppercase text-red-500 mb-6">
          Um Kósýbíó
        </h2>
        <div className="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed flex flex-col gap-4">
          <p>
            Velkomin í Kósýbíó – notalega jólamyndastund sem Menningar- og þjónustusvið býður starfsfólki Reykjanesbæjar.
            Markmiðið er einfalt: að gefa okkur tækifæri til að slaka aðeins á í jólaamstrinu og njóta skemmtilegrar mynd saman.
          </p>
          <p>
            Við veljum myndirnar af natni til að skapa hlýja og létta stemmningu, þannig að þú getir sest niður, gleymt kuldanum úti og notið augnabliksins.
          </p>
          <p>
            Kósýbíó er lítil jólagleði – og falleg leið fyrir okkur sem vinnum hjá sveitarfélaginu að njóta aðventunnar saman.
          </p>
        </div>
      </div>
    </section>
  );
});

export default About;