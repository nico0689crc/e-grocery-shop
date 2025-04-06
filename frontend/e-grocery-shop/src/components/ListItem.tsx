import Link from "@/components/mui/Link"

type Product = {
  id: string
  title: string
}

const ListItem = ({ item }: { item: Product }) => {
  return (
    <li key={item.id}>
      <Link  href={`products/${item.id}`} color="inherit"> 
        {item.title}
      </Link>
    </li>
  )
}

export default ListItem
