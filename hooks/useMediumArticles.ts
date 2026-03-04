import { useState, useEffect } from "react";

export interface MediumArticle {
  title: string;
  pubDate: string;
  link: string;
  guid: string;
  author: string;
  thumbnail: string;
  description: string;
  content: string;
  categories: string[];
}

export function useMediumArticles() {
  const [articles, setArticles] = useState<MediumArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch(
          "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@shadhujan"
        );
        const data = await res.json();
        if (data.status === "ok") {
          setArticles(data.items);
        } else {
          setError("Failed to fetch articles");
        }
      } catch (err) {
        setError("An error occurred while fetching articles");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Helper to extract first image from content if thumbnail is missing
  const extractImage = (item: MediumArticle) => {
    if (item.thumbnail && item.thumbnail.length > 0) return item.thumbnail;
    
    // Try to find image in description/content
    const imgRegex = /<img[^>]+src="([^">]+)"/;
    const match = item.description.match(imgRegex) || item.content.match(imgRegex);
    if (match) return match[1];
    
    return null;
  };

  return { articles, loading, error, extractImage };
}
