import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, User } from "lucide-react";

export const metadata = {
  title: "Blog | Ember & Ash",
  description: "Read our latest articles, chef tips, and stories from the Ember & Ash kitchen.",
};

import { BLOG_POSTS } from "@/lib/data/blog";

export default function BlogPage() {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-primary">The Ember Journal</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stories from our kitchen, philosophy on fire-cooking, and deep dives into the ingredients that define us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
          {BLOG_POSTS.map((post, index) => (
            <article key={post.id} className="group flex flex-col bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-colors shadow-sm cursor-pointer">
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase border border-border">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-6 md:p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-4 text-xs tracking-wider text-muted-foreground mb-4 uppercase font-semibold">
                  <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{post.date}</span>
                  <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" />{post.author}</span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                  {post.excerpt}
                </p>
                <Link href={`/blog/${post.id}`} className="inline-flex items-center text-sm font-bold text-primary hover:text-primary/80 transition-colors mt-auto w-fit">
                  Read Article <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
