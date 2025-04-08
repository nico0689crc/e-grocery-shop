import type { LocaleWithIDParams } from '@core/types'
import { getProductFromServer, getProductsFromServer } from '@server/actions'
import { getDictionary } from '@/locales/getDictionary'
import { i18n } from '@/locales/i18n'

export const generateStaticParams = async () => {
  const { products } = await getProductsFromServer({
    variables: {
      page: 1,
      pageSize: 99999999
    }
  })

  return products.flatMap(product =>
    i18n.locales.map(lang => ({
      id: product.id,
      lang
    }))
  )
}

export const dynamicParams = false
export const revalidate = 60

const ProductPage = async (props: LocaleWithIDParams) => {
  const { id, lang } = await props.params
  const dictionary = await getDictionary(lang)

  const { product } = await getProductFromServer({
    variables: {
      productId: id
    }
  })

  return (
    <div>
      <h1>{dictionary['title']}</h1>
      <h1>{dictionary['first']['second']['third']}</h1>
      <p>{product.title}</p>
      <p>{product.description}</p>
    </div>
  )
}

export default ProductPage
