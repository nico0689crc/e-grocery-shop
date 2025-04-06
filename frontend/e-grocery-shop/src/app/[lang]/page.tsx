// Types
import { Button } from '@mui/material'

import type { LocaleParams } from '@core/types' // Assuming you have a separate file for types

// External Libraries

// Utilities
import { getDictionary } from '@/locales/getDictionary'
import { getProductsFromServer } from '../server/products'

// Components
import ListItem from '@/components/ListItem'
import Wrapper from '@/components/Wrapper'

// Main Component
export default async function Home({ params }: LocaleParams) {
  const { lang } = await params
  const dictionary = await getDictionary(lang)

  const { products } = await getProductsFromServer()

  return (
    <Wrapper>
      <h1>{dictionary['title']}</h1>
      <h1>{dictionary['first']['second']['third']}</h1>
      <Button variant='contained'>Button</Button>
      <ul>
        {products.map(product => (
          <ListItem key={product.id} item={product} />
        ))}
      </ul>
    </Wrapper>
  )
}
