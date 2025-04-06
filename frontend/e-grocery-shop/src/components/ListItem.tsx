type Product = {
  id: string
  title: string
}

const ListItem = ({ item }: { item: Product }) => {
  return <li key={item.id}>{item.title}</li>
}

export default ListItem
