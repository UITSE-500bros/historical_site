
export function ContentDisplay({ contents }: { contents: any[] }) {
  
  return (
    <div className="space-y-8">
      {contents.map(item =>
          item.parentId === null ? (
            <div key={item.contentId}>{item.contentName}</div>
          ) : null
        )}
      {contents
        // .filter((c) => c.content && c.content.trim().length > 0)
        .map((item) => (

          <section key={item.contentId} id={item.contentId}>
            <h3 className="text-2xl font-semibold mb-2">{item.contentName}</h3>
            <article className="prose max-w-none whitespace-pre-wrap text-justify">
              {item.content}
            </article>

            {item.images?.map((img: any) => (
              <div key={img.imageId} className="mt-4">
                <img src={img.src} alt={img.alt} className="rounded shadow" />
                <p className="text-sm text-gray-500 italic">{img.caption}</p>
              </div>
            ))}
          </section>
        ))}
        
    </div>
  );
}
