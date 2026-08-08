type PlaceholderPageProps = {
  title: string
  description: string
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="page">
      <h1 className="page__title">{title}</h1>
      <p className="page__description">{description}</p>
      <p className="page__status">Em construção</p>
    </div>
  )
}
