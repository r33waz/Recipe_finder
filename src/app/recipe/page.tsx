"use client";
import React, { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FilterByIngredent from "@/app/recipe/filterByIngredent/page";
import FilterByCategory from "@/app/recipe/filterByCategory/page";
import FilterByArea from "@/app/recipe/filterByArea/page";

function Home() {
  useEffect(() => {
    // Load Instagram embed script
    const instagramScript = document.createElement("script");
    instagramScript.async = true;
    instagramScript.src = "//www.instagram.com/embed.js";
    document.body.appendChild(instagramScript);

    // Load TikTok embed script
    const tiktokScript = document.createElement("script");
    tiktokScript.src = "https://www.tiktok.com/embed.js";
    tiktokScript.async = true;
    document.body.appendChild(tiktokScript);
  }, []);

  return (
    <main className="flex-grow container mx-auto px-4 py-8">
      <Tabs defaultValue="ingredient" className="mb-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="ingredient">By Ingredient</TabsTrigger>
          <TabsTrigger value="category">By Category</TabsTrigger>
          <TabsTrigger value="area">By Area</TabsTrigger>
        </TabsList>
        <TabsContent value="ingredient">
          <FilterByIngredent />
        </TabsContent>
        <TabsContent value="category">
          <FilterByCategory />
        </TabsContent>
        <TabsContent value="area">
          <FilterByArea />
        </TabsContent>
      </Tabs>

      {/* Instagram Embed */}
      {/* <div className="instagram-embed">
        <blockquote
          className="instagram-media"
          data-instgrm-captioned
          data-instgrm-permalink="https://www.instagram.com/reel/DA0rrsag6W9/?utm_source=ig_embed&amp;utm_campaign=loading"
          data-instgrm-version="14"
          style={{
            background: "#FFF",
            border: 0,
            borderRadius: "3px",
            boxShadow:
              "0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15)",
            margin: "1px",
            maxWidth: "540px",
            minWidth: "326px",
            padding: 0,
            width: "99.375%",
          }}
          dangerouslySetInnerHTML={{
            __html: `
          <div style="padding:16px;">
            <a href="https://www.instagram.com/reel/DA0rrsag6W9/?utm_source=ig_embed&amp;utm_campaign=loading" style="background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank">
              <div style="display: flex; flex-direction: row; align-items: center;">
                <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div>
                <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;">
                  <div style="background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div>
                  <div style="background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div>
                </div>
              </div>
              <div style="padding: 19% 0;"></div>
              <div style="display:block; height:50px; margin:0 auto 12px; width:50px;">
                <svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink">
                  <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g transform="translate(-511.000000, -20.000000)" fill="#000000">
                      <g>
                        <path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41"></path>
                        <path d="M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657"></path>
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
              <div style="padding-top: 8px;">
                <div style="color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;">
                  View this post on Instagram
                </div>
              </div>
              <div style="padding: 12.5% 0;"></div>
            </a>
            <p style="color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;">
              <a href="https://www.instagram.com/reel/DA0rrsag6W9/?utm_source=ig_embed&amp;utm_campaign=loading" style="color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;" target="_blank">
                A post shared by Gadgetbyte नेपाली (@gadgetbyte)
              </a>
            </p>
          </div>`,
          }}
        />
      </div>

      {/* TikTok Embed */}
    
    </main>
  );
}

export default Home;
