"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Search, X, ArrowRight, CircleCheck, ChevronRight } from "lucide-react";
import { JUMP_TO, TEST_CATEGORIES } from "../../data/tests";

const slugify = (name: string) => name.toLowerCase().replace(/\s+/g, "-");

export default function WhatWeTestCatalogSection() {
  const [active, setActive] = useState<string>(TEST_CATEGORIES[0]?.slug ?? "");
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const q = query.trim().toLowerCase();
  const filteredCategories = q
    ? TEST_CATEGORIES.map((cat) => ({
        ...cat,
        tests: cat.tests.filter((t) => t.name.toLowerCase().includes(q)),
      })).filter(
        (cat) => cat.title.toLowerCase().includes(q) || cat.tests.length > 0
      )
    : TEST_CATEGORIES;

  // Scroll-spy: highlight the "Jump to" chip of the category currently under the top of the viewport.
  // Sections are looked up on every scroll so categories hidden by the search box never count.
  const visibleKey = filteredCategories.map((c) => c.slug).join(",");
  useEffect(() => {
    const offset = 140;
    const sections = visibleKey
      .split(",")
      .map((slug) => document.getElementById(slug))
      .filter((el): el is HTMLElement => !!el);
    if (!sections.length) return;

    const update = () => {
      let current = sections[0].id;
      for (const el of sections) {
        if (el.getBoundingClientRect().top <= offset) current = el.id;
      }
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 60
      ) {
        current = sections[sections.length - 1].id;
      }
      setActive(current);
    };

    // IntersectionObserver keeps the highlight in sync even under Lenis smooth scroll.
    const observer = new IntersectionObserver(
      () => update(),
      { rootMargin: `-${offset}px 0px -40% 0px`, threshold: 0 },
    );
    sections.forEach((el) => observer.observe(el));

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    update();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [visibleKey]);

  return (
    <section className="bg-[#FEF9EF] py-12 md:py-16 lg:py-[120px]">
      <div className="mx-auto flex w-full max-w-360 flex-col gap-8 px-5 md:px-8 lg:flex-row lg:gap-[clamp(24px,3.3vw,48px)] lg:px-[clamp(32px,5.07vw,73px)]">
        {/* Left sidebar */}
        <aside className="min-w-0 lg:w-[35%] lg:max-w-[454px] lg:shrink-0">
          <div className="flex flex-col gap-[20px] lg:sticky lg:top-28 lg:gap-[30px]">
            <div
              className={`flex items-center gap-[10px] rounded-[70px] border bg-white px-[21px] py-[15px] transition-colors ${
                focused ? "border-[#17925A]" : "border-[#46524B]"
              }`}
            >
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="Search tests"
                className="w-full bg-transparent text-[18px] text-[#46524B] outline-none placeholder:text-[#A1AAA3] lg:text-[20px]"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="shrink-0 text-[#A1AAA3] hover:text-[#46524B]"
                >
                  <X className="h-6 w-6" />
                </button>
              ) : (
                <Search className="h-6 w-6 shrink-0 text-[#A1AAA3]" />
              )}
            </div>

            <div className="flex flex-col gap-[15px]">
              <span className="text-[16px] uppercase text-[#6E7A72]">Jump to:</span>
              <div className="flex flex-wrap gap-x-[7px] gap-y-[10px] lg:gap-y-[15px]">
                {JUMP_TO.map((item) => {
                  const slug = slugify(item.name);
                  const isActive = active === slug;
                  return (
                    <a
                      key={item.name}
                      href={`#${slug}`}
                      className={`shrink-0 whitespace-nowrap rounded-[70px] px-[15px] py-[8px] text-[14px] ${
                        isActive
                          ? "bg-[#17925A] text-white"
                          : "border border-[#46524B] text-[#46524B]"
                      }`}
                    >
                      {item.name}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </aside>

        {/* Right: category sections */}
        <div className="flex min-w-0 flex-col gap-[48px] lg:flex-1 lg:gap-[80px]">
          {filteredCategories.length === 0 && (
            <p className="text-[16px] text-[#6E7A72]">
              No tests match “{query}”.
            </p>
          )}
          {filteredCategories.map((category) => (
            <div
              key={category.slug}
              id={category.slug}
              className="flex scroll-mt-24 flex-col gap-[24px] lg:gap-[41px]"
            >
              {/* Header */}
              <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
                <div className="flex items-center gap-[11px]">
                  <Image
                    src={`/what-we-test/icons/category-icon-${category.icon.filenameSuffix}.png`}
                    alt=""
                    width={category.icon.width}
                    height={category.icon.height}
                    className="h-auto w-[48px] object-contain sm:w-[64px]"
                  />
                  <div className="flex items-center gap-[13px]">
                    <h3 className="whitespace-nowrap text-[24px] font-bold leading-none text-[#46524B] sm:text-[30px] lg:text-[34px]">
                      {category.title}
                    </h3>
                    <span className="font-medium leading-none text-[#46524B]">
                      <span className="text-[18px] lg:text-[24px]">(</span>
                      <span className="text-[16px] lg:text-[20px]">{category.count}</span>
                      <span className="text-[18px] lg:text-[24px]">)</span>
                    </span>
                  </div>
                </div>

                <div className="hidden shrink-0 flex-col gap-[5px] py-[14px] sm:flex">
                  <span className="flex items-end justify-end gap-[12px]">
                    <span className="whitespace-nowrap text-[16px] font-bold text-[#17925A]">
                      {category.aboutText}
                    </span>
                    <ArrowRight className="h-5 w-5 shrink-0 text-[#17925A]" />
                  </span>
                  <span className="h-px w-full bg-[#17925A]" />
                </div>
              </div>

              {/* Test list */}
              <div className="flex flex-col gap-[15px]">
                {category.tests.map((test) => (
                  <div
                    key={test.name}
                    className="flex min-h-[70px] items-center justify-between gap-3 rounded-[8px] border border-[#BFD1C4] bg-[#E1F5E8] py-[10px] pl-[14px] pr-[10px] lg:pl-[29px] lg:pr-[19px]"
                  >
                    <div className="flex min-w-0 flex-wrap items-center gap-x-[20px] gap-y-1">
                      <span className="flex items-start gap-[10px] sm:items-center">
                        <CircleCheck className="mt-[1px] h-5 w-5 shrink-0 text-[#46524B] sm:mt-0" />
                        <span className="text-[14px] font-bold text-[#46524B] lg:text-[16px]">
                          {test.name}
                        </span>
                      </span>
                      {test.note && (
                        <span className="pl-[30px] text-[#46524B] sm:pl-0">
                          <span className="text-[14px] font-medium lg:text-[16px]">[</span>
                          <span className="text-[10px] font-normal uppercase tracking-[1.32px] lg:text-[12px]">
                            {test.note}
                          </span>
                          <span className="text-[14px] font-medium lg:text-[16px]">]</span>
                        </span>
                      )}
                    </div>
                    <ChevronRight className="h-6 w-6 shrink-0 text-[#46524B]" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
