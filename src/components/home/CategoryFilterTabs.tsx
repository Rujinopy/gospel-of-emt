import React, { useState } from "react";

interface CategoryTab {
  name: string;
  slug: string;
  displayName: string;
}

interface SerializedPost {
  id: string;
  data: {
    title: string;
    imageAlt?: string;
    image?: {
      src: string;
      width: number;
      height: number;
    } | null;
  };
}

interface Props {
  categories: CategoryTab[];
  postsByCategory: Record<string, SerializedPost[]>;
}

const CategoryFilterTabs: React.FC<Props> = ({ categories, postsByCategory }) => {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.slug || "");

  const activePosts = postsByCategory[activeCategory] || [];

  return (
    <div className="w-full">
      {/* Category Tabs */}
      <div className="mb-6 flex flex-wrap gap-2 justify-start">
        {categories.map((category) => (
          <button
            key={category.slug}
            onClick={() => setActiveCategory(category.slug)}
            className={`
              px-4 py-2 rounded-full font-notoLooped text-xs md:text-sm md:text-base
              transition-all duration-200 border
              ${
                activeCategory === category.slug
                  ? "bg-[#B59EF0] text-white border-[#B59EF0] shadow-lg transform scale-105"
                  : "bg-white dark:bg-[#081014] border-black dark:border-gray-600 hover:bg-[#B59EF0] hover:text-white hover:border-[#B59EF0]"
              }
            `}
          >
            {category.displayName}
          </button>
        ))}
      </div>

      {/* Posts Grid - Mobile: Horizontal scroll, Desktop: Grid */}
      <div className="overflow-x-auto overflow-y-hidden md:overflow-visible -mx-4 md:mx-0">
        <div className="flex md:grid gap-3 md:gap-4 px-4 md:px-0 md:grid-cols-3 lg:grid-cols-4">
          {activePosts.map((post, index) => (
            <div key={post.id} className="relative flex-shrink-0 w-[140px] md:w-auto">
              {/* Rank Badge - Matching ArcSection */}
              {/* <div className="absolute -top-2 -left-2 z-10 bg-[#B59EF0] text-white font-bold rounded-full w-7 h-7 md:w-8 md:h-8 flex items-center justify-center text-xs md:text-sm shadow-lg">
                {index + 1}
              </div> */}
            
              {/* Card - Matching LatestBlogCard Style */}
              <div className="group h-full rounded-lg overflow-visible transition-all duration-300 hover:transform hover:translate-y-4 hover:shadow-[6px_6px_0px_0px_black] border border-slate-800">
                <a href={`/blog/${post.id}`} className="block h-full">
                  <div className=" bg-white/70 dark:bg-black/70 h-full rounded-lg ">  

                  {post.data.image && (
                      <div className="absolute right-0 -top-0 opacity-0 md:group-hover:opacity-100 transition-all duration-300 pointer-events-none z-10 group-hover:-top-64">
                        <div className="relative w-48 h-48 xl:w-64 xl:h-64">
                          <img
                            src={post.data.image.src}
                            alt={post.data.imageAlt || post.data.title}
                            className="w-full h-full object-cover rounded-lg shadow-2xl"
                            width={500}
                            height={500}
                          />
                        </div>
                      </div>
                    )}    
                    {/* Content Section */}
                    <div className="p-4 flex flex-col gap-2">
                      <p className="font-notoLooped text-base md:text-lg  line-clamp-3 group-hover:text-[#B59EF0] transition-colors duration-300">
                        {post.data.title}
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilterTabs;
