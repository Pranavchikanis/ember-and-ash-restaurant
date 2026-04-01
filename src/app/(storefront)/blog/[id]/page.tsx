import { BLOG_POSTS } from "@/lib/data/blog";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, ArrowLeft } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const post = BLOG_POSTS.find((p) => p.id === resolvedParams.id);
  
  if (!post) return { title: "Article Not Found | Ember & Ash" };

  return {
    title: `${post.title} | Ember & Ash`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const post = BLOG_POSTS.find((p) => p.id === resolvedParams.id);

  if (!post) {
    notFound();
  }

  // Convert double newlines to paragraphs for rendering
  const paragraphs = post.content.split("\\n\\n");

  return (
    <div className="pt-24 pb-24 min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <Link 
          href="/blog" 
          className="inline-flex items-center text-sm font-semibold text-muted-foreground hover:text-primary transition-colors mb-10 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
          Back to Journal
        </Link>

        {/* Header */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase border border-primary/20 mb-6">
            {post.category}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 text-foreground leading-[1.1]">
            {post.title}
          </h1>
          
          <div className="flex items-center gap-6 text-sm tracking-widest text-muted-foreground mb-12 uppercase font-semibold border-b border-border pb-8">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {post.date}
            </span>
            <span className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {post.author}
            </span>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden mb-16 shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content */}
        <article className="prose prose-lg dark:prose-invert max-w-none animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 space-y-8 text-muted-foreground leading-loose">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="text-foreground/90 text-lg md:text-xl font-light">
              {paragraph}
            </p>
          ))}
        </article>

        {/* Footer/Author Block */}
        <div className="mt-20 pt-10 border-t border-border flex items-center gap-6 animate-in fade-in duration-700 delay-500">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
            <User className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-foreground">Written by {post.author}</h3>
            <p className="text-muted-foreground text-sm mt-1">
              {post.author === "Chef Marco" 
                ? "Executive Chef at Ember & Ash, specializing in wood-fired culinary techniques and indigenous ingredient sourcing." 
                : "Culinary storyteller and ingredient specialist for Ember & Ash."}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
