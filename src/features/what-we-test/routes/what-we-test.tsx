import React from "react";
import WhatWeTestHeroSection from "../components/sections/WhatWeTestHeroSection";
import WhatWeTestCatalogSection from "../components/sections/WhatWeTestCatalogSection";
import WhatWeTestCTASection from "../components/sections/WhatWeTestCTASection";

export const WhatWeTestPage = () => {
  return (
    <main>
      <WhatWeTestHeroSection />
      <WhatWeTestCatalogSection />
      <WhatWeTestCTASection />
    </main>
  );
};
