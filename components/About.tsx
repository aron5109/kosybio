import React from 'react';

const About = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <section ref={ref} className="py-16 md:py-24 bg-white dark:bg-black">
      <div className="container mx-auto px-4 text-center max-w-3xl">
        <h2 className="font-orbitron text-4xl md:text-5xl font-bold uppercase text-red-500 mb-6">
          Um Kósýbíó
        </h2>
        <p className="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
          Velkomin í Kósýbíó, þína einstöku jólabíóupplifun. Við trúum á töfra kvikmyndanna og hlýju hátíðarinnar. Vandlega valið úrval okkar af kvikmyndum er hannað til að veita þér gleði, spennu og notalega hátíðartilfinningu. Gleymdu kuldanum úti, gríptu sýndarheitt kakó og komdu þér fyrir í kvikmyndaferðalagi sem á sér engan líka. Þetta er meira en bara bíó; þetta er jólahefð í mótun.
        </p>
      </div>
    </section>
  );
});

export default About;