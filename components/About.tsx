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
            Velkomin í Kósýbíó – notalega jólastund í boði Menningar- og þjónustusviðs. Markmiðið er einfalt, að skapa tækifæri til að slaka aðeins á í jólaamstrinu og njóta skemmtilegra jólamynda saman.
          </p>
          <p>
            Við höfum valið myndirnar af natni til að skapa hlýja og létta stemmningu og svo allir fái eitthvað við sitt hæfi. Vonandi hefur þú tækifæri til að kíkja við og gleyma þér í augnablik frá vinnu og jólaundirbúningi.
          </p>
          <p>
            Auðvitað verður boðið upp á viðeigandi veitingar. <br/>
            Hlökkum til að sjá þig!
          </p>
        </div>
      </div>
    </section>
  );
});

export default About;