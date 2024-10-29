import { anchorTags } from "@/helpers/anchorTags";

export function TextBlock({ children, title, subtitle, body, anchor }) {
  return (
    <section className="py-8 lg:py-28" {...anchorTags(anchor)}>
      <div className="container">
        <div className="text-center">
          <h3 className="text-xl font-semibold lg:text-3xl">{title}</h3>
          <p className="mt-4 text-base lg:text-lg">{subtitle}</p>
          <div
            className="mt-1 text-base-content/80 mb-4"
            dangerouslySetInnerHTML={{ __html: body }}
          />
          {children}
        </div>
      </div>
    </section>
  );
}
