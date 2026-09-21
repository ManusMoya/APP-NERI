import { useMemo, useState } from 'react'
import { excelOperations } from './importedExcelData'
import './App.css'

const initialOperations = excelOperations.map((operation) => ({
  ...operation,
  name: operation.name === 'Cliente no identificado' ? '' : operation.name,
}))

const initialProducts = [
  { id: 1, name: 'Alpargata yute original', factory: 'Sin fábrica asignada', cost: 10800, price: 15120, stock: 0, status: 'Activo' },
  { id: 2, name: 'Botas media caña brasileña', factory: 'Sin fábrica asignada', cost: 29000, price: 40600, stock: 0, status: 'Activo' },
  { id: 3, name: 'Chaleco gamuza', factory: 'Sin fábrica asignada', cost: 18000, price: 25200, stock: 0, status: 'Activo' },
  { id: 4, name: 'Bombachas de campo', factory: 'Sin fábrica asignada', cost: 14800, price: 20720, stock: 0, status: 'Activo' },
  { id: 5, name: 'Alpargatas simil yute', factory: 'Sin fábrica asignada', cost: 4820, price: 6748, stock: 0, status: 'Activo' },
  { id: 6, name: 'Termo bala', factory: 'FDL', cost: 11200, price: 15680, stock: 0, status: 'Activo' },
  { id: 7, name: 'Set juego regional', factory: 'FDL', cost: 5990, price: 8386, stock: 0, status: 'Activo' },
  { id: 8, name: 'Bombacha de campo grafa', factory: 'FDL', cost: 14000, price: 19600, stock: 0, status: 'Activo' },
  { id: 9, name: 'Cinturón trenzado combinado x 12', factory: 'FDL', cost: 5000, price: 7000, stock: 0, status: 'Activo' },
  { id: 10, name: 'Boina hilo', factory: 'FDL', cost: 5000, price: 7000, stock: 0, status: 'Activo' },
  { id: 11, name: 'Bermuda cargo', factory: 'FDL', cost: 13000, price: 18200, stock: 0, status: 'Activo' },
  { id: 12, name: 'Chomba pampa', factory: 'FDL', cost: 12000, price: 16800, stock: 0, status: 'Activo' },
  { id: 13, name: 'Tabla pizzer', factory: 'FDL', cost: 3900, price: 5460, stock: 0, status: 'Activo' },
  { id: 14, name: 'Bombilla alpaca plana', factory: 'FDL', cost: 3000, price: 4200, stock: 0, status: 'Activo' },
  { id: 15, name: 'Ruana pampa', factory: 'FDL', cost: 24000, price: 33600, stock: 0, status: 'Activo' },
  { id: 16, name: 'Billetera c volante cuero', factory: 'FDL', cost: 3500, price: 4900, stock: 0, status: 'Activo' },
  { id: 17, name: 'Bufandones pahmina', factory: 'FDL', cost: 13000, price: 18200, stock: 0, status: 'Activo' },
  { id: 18, name: 'Alpargata goma eva', factory: 'Sin fábrica asignada', cost: 3848, price: 5387.2, stock: 0, status: 'Activo' },
  { id: 19, name: 'Chomba pampero', factory: 'Sin fábrica asignada', cost: 20860, price: 29204, stock: 0, status: 'Activo' },
  { id: 20, name: 'Zapatillas jaguar', factory: 'Sin fábrica asignada', cost: 7469, price: 10456.6, stock: 0, status: 'Activo' },
  { id: 21, name: 'Bicicleta Explorer', factory: 'Sin fábrica asignada', cost: 285000, price: 400000, stock: 0, status: 'Activo' },
  { id: 22, name: 'Zapato hombre', factory: 'Sin fábrica asignada', cost: 10900, price: 15260, stock: 0, status: 'Activo' },
  { id: 23, name: 'Cinturón bordado', factory: 'Sin fábrica asignada', cost: 15000, price: 21000, stock: 0, status: 'Activo' },
  { id: 24, name: 'Alpargatas estampadas', factory: 'Sin fábrica asignada', cost: 5350, price: 7490, stock: 0, status: 'Activo' },
  { id: 25, name: 'Camisa cuello mao', factory: 'Sin fábrica asignada', cost: 15000, price: null, stock: 0, status: 'Activo' },
  { id: 26, name: 'Campera pampa', factory: 'Sin fábrica asignada', cost: 16500, price: null, stock: 0, status: 'Activo' },
  { id: 27, name: 'Slip', factory: 'Sin fábrica asignada', cost: 14500, price: null, stock: 0, status: 'Activo' },
  { id: 28, name: 'Poncho niño', factory: 'Sin fábrica asignada', cost: 15000, price: null, stock: 0, status: 'Activo' },
  { id: 29, name: 'Poncho', factory: 'Sin fábrica asignada', cost: 20000, price: null, stock: 0, status: 'Activo' },
  { id: 30, name: 'Alpargata niño', factory: 'Sin fábrica asignada', cost: 5200, price: null, stock: 0, status: 'Activo' },
  { id: 31, name: 'Bombacha niño', factory: 'Sin fábrica asignada', cost: 13000, price: null, stock: 0, status: 'Activo' },
  { id: 32, name: 'Pañuelo cuello', factory: 'Sin fábrica asignada', cost: 3700, price: 5900, stock: 0, status: 'Activo' },
  { id: 33, name: 'Camisa clásica', factory: 'Sin fábrica asignada', cost: 12000, price: 21000, stock: 0, status: 'Activo' },
  { id: 34, name: 'Pasapañuelos', factory: 'Sin fábrica asignada', cost: 1800, price: 2900, stock: 0, status: 'Activo' },
  { id: 35, name: 'Pantalón cargo', factory: 'Sin fábrica asignada', cost: 16000, price: null, stock: 0, status: 'Activo' },
  { id: 36, name: 'Bombacha bordada', factory: 'Sin fábrica asignada', cost: 16500, price: null, stock: 0, status: 'Activo' },
  { id: 37, name: 'Mate imperial alpaca', factory: 'Sin fábrica asignada', cost: 19000, price: null, stock: 0, status: 'Activo' },
  { id: 38, name: 'Chaleco niño', factory: 'Sin fábrica asignada', cost: 11000, price: null, stock: 0, status: 'Activo' },
  { id: 39, name: 'Sombrero paja', factory: 'Sin fábrica asignada', cost: 15000, price: null, stock: 0, status: 'Activo' },
  { id: 40, name: 'Medias', factory: 'Sin fábrica asignada', cost: 3000, price: null, stock: 0, status: 'Activo' },
  { id: 41, name: 'Ruana', factory: 'Sin fábrica asignada', cost: 20000, price: null, stock: 0, status: 'Activo' },
  { id: 42, name: 'Cinturón cuero', factory: 'Sin fábrica asignada', cost: 12000, price: 24000, stock: 0, status: 'Activo' },
  { id: 43, name: 'Campera niño', factory: 'Sin fábrica asignada', cost: 14500, price: null, stock: 0, status: 'Activo' },
  { id: 44, name: 'Billetera en caja', factory: 'Sin fábrica asignada', cost: 6000, price: null, stock: 0, status: 'Activo' },
  { id: 45, name: 'Boina niño', factory: 'Sin fábrica asignada', cost: 13000, price: null, stock: 0, status: 'Activo' },
  { id: 46, name: 'Canasta matera', factory: 'Sin fábrica asignada', cost: 28000, price: null, stock: 0, status: 'Activo' },
  { id: 47, name: 'Bufandón', factory: 'Sin fábrica asignada', cost: 20000, price: null, stock: 0, status: 'Activo' },
  { id: 48, name: 'Alpargatas combinadas goma eva', factory: 'Sin fábrica asignada', cost: 4560, price: 9800, stock: 0, status: 'Activo' },
  { id: 49, name: 'Alpargatas faja pampa', factory: 'Sin fábrica asignada', cost: 6900, price: 13800, stock: 0, status: 'Activo' },
  { id: 50, name: 'Alpargatas guarda pampa goma eva', factory: 'Sin fábrica asignada', cost: 4700, price: 9800, stock: 0, status: 'Activo' },
  { id: 51, name: 'Buzo micropolar', factory: 'Sin fábrica asignada', cost: 15900, price: null, stock: 0, status: 'Activo' },
  { id: 52, name: 'Cintos hebillones', factory: 'Sin fábrica asignada', cost: 9500, price: 16900, stock: 0, status: 'Activo' },
  { id: 53, name: 'Pulsera cuero', factory: 'Sin fábrica asignada', cost: 3200, price: 6400, stock: 0, status: 'Activo' },
  { id: 54, name: 'Bicicleta turquesa', factory: 'Sin fábrica asignada', cost: 160200, price: 210000, stock: 0, status: 'Activo' },
  { id: 55, name: 'Chomba pampa niño', factory: 'Sin fábrica asignada', cost: 10000, price: null, stock: 0, status: 'Activo' },
  { id: 56, name: 'Boina hilo bordada', factory: 'Sin fábrica asignada', cost: 7500, price: 12500, stock: 0, status: 'Activo' },
  { id: 57, name: 'Corbatín bordado', factory: 'Sin fábrica asignada', cost: 3000, price: null, stock: 0, status: 'Activo' },
]

const catalogProducts = initialProducts.map((product) => ({
  ...product,
  factory: /bicicleta/i.test(product.name) ? 'Enrique Bicicletas' : 'Reginales FDL',
}))

const initialClients = [
  { id: 1, name: 'Agustina Masnú (Jauja)', phone: '', note: '' },
  { id: 2, name: 'Andrea Menoyo', phone: '', note: '' },
  { id: 3, name: 'Andrés Cafaro', phone: '', note: '' },
  { id: 4, name: 'Arturo Jora', phone: '', note: '' },
  { id: 5, name: 'Belén (Calcuta)', phone: '', note: '' },
  { id: 6, name: 'Belén Caliri (fraternidad)', phone: '', note: '' },
  { id: 7, name: 'Carla Mellado (Sanfran)', phone: '', note: '' },
  { id: 8, name: 'Carolina Pedrozo (Calasanz)', phone: '', note: '' },
  { id: 9, name: 'Caty mamá (mamá Mariela Cuñeti)', phone: '', note: '' },
  { id: 10, name: 'Celeste Atiye (Calasanz)', phone: '', note: '' },
  { id: 11, name: 'Euge Pozzoli', phone: '', note: '' },
  { id: 12, name: 'Eva Dominguez', phone: '', note: '' },
  { id: 13, name: 'Gisella Dutto', phone: '', note: '' },
  { id: 14, name: 'Jorgelina (Calasanz)', phone: '', note: '' },
  { id: 15, name: 'Laura vecina Mónica (Calasanz)', phone: '', note: '' },
  { id: 16, name: 'Leandro Ávila', phone: '', note: '' },
  { id: 17, name: 'Lili Lemos', phone: '', note: '' },
  { id: 18, name: 'Manuel Moya', phone: '', note: '' },
  { id: 19, name: 'María E Berrios (Sanfran)', phone: '', note: '' },
  { id: 20, name: 'Mariana Aceto', phone: '', note: '' },
  { id: 21, name: 'Mariel (mamá Leandro)', phone: '', note: '' },
  { id: 22, name: 'Mariela amiga Laura (Calasanz)', phone: '', note: '' },
  { id: 23, name: 'Marina Montesino', phone: '', note: '' },
  { id: 24, name: 'Marisol Pascual (Calcuta)', phone: '', note: '' },
  { id: 25, name: 'Meli Giordano (vecina)', phone: '', note: '' },
  { id: 26, name: 'Merce Guiroy (Calasanz)', phone: '', note: '' },
  { id: 27, name: 'Mercedes Sancho', phone: '', note: '' },
  { id: 28, name: 'Micaela Duin (vecina)', phone: '', note: '' },
  { id: 29, name: 'Mónica Lledó', phone: '', note: '' },
  { id: 30, name: 'Naty (amiga Mariana Aceto)', phone: '', note: '' },
  { id: 31, name: 'Nerina Martínez', phone: '', note: '' },
  { id: 32, name: 'Pablo Pabezka', phone: '', note: '' },
  { id: 33, name: 'Padre Eduardo', phone: '', note: '' },
  { id: 34, name: 'Pía Bendolini', phone: '', note: '' },
  { id: 35, name: 'Pilar Loring', phone: '', note: '' },
  { id: 36, name: 'Silvia Sol', phone: '', note: '' },
  { id: 37, name: 'Susi Morales', phone: '', note: '' },
  { id: 38, name: 'Violeta (fraternidad)', phone: '', note: '' },
  { id: 39, name: 'Yani vecina', phone: '', note: '' },
  { id: 40, name: 'Yisela Aguilera (Calasanz)', phone: '', note: '' },
]

const initialFactories = [
  'Alpargatas Argentinas',
  'Reginales FDL',
  'Enrique Bicicletas',
  'Fiorentino',
  'Marroquinería',
  'Anchus Mayorista',
]

const tabs = ['REGISTRO', 'PRODUCTOS', 'CLIENTES', 'BALANCE']
const operationStatuses = [
  'Sin comprar',
  'Comprado',
  'Sin pagar',
  'Pago parcial',
  'Pagado',
]
const statusFilters = ['Todos', ...operationStatuses]
const productStatusFilters = ['Todos', 'Activo', 'Revisar', 'Sin stock']

function createEmptyOperationForm() {
  return {
    date: new Date().toISOString().slice(0, 10),
    name: '',
    factory: '',
    detail: '',
    status: 'Pendiente',
    purchase: '',
    payment: '',
    total: '',
    additionalExpenses: '',
    itemFactory: '',
    itemProductName: '',
    itemQuantity: 1,
    items: [],
  }
}

function getSuggestedSalePrice(cost) {
  const numericCost = Number(cost)
  if (!numericCost) return ''

  return String(Math.round(numericCost * 1.5))
}

const emptyProductForm = {
  name: '',
  factory: '',
  cost: '',
  price: '',
  stock: '',
  status: 'Activo',
}

const emptyClientForm = {
  name: '',
  phone: '',
  note: '',
}

const currencyFormatter = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0,
})

function App() {
  const [activeTab, setActiveTab] = useState('REGISTRO')
  const [operations, setOperations] = useState(initialOperations)
  const [products, setProducts] = useState(catalogProducts)
  const [clients, setClients] = useState(initialClients)
  const [factoryOptions, setFactoryOptions] = useState(initialFactories)
  const [filters, setFilters] = useState({
    search: '',
    factory: 'Todas',
    status: 'Todos',
    from: '',
    to: '',
  })
  const [operationFormType, setOperationFormType] = useState(null)
  const [operationForm, setOperationForm] = useState(createEmptyOperationForm)
  const [editingOperationId, setEditingOperationId] = useState(null)
  const [showProductForm, setShowProductForm] = useState(false)
  const [productForm, setProductForm] = useState(emptyProductForm)
  const [editingProductId, setEditingProductId] = useState(null)
  const [showClientForm, setShowClientForm] = useState(false)
  const [clientForm, setClientForm] = useState(emptyClientForm)
  const [productFilters, setProductFilters] = useState({
    search: '',
    factory: 'Todas',
    status: 'Todos',
    price: 'Todos',
  })
  const [clientSearch, setClientSearch] = useState('')
  const [newFactoryName, setNewFactoryName] = useState('')

  const factories = useMemo(() => {
    const operationFactories = operations.map((operation) => operation.factory)
    const productFactories = products.map((product) => product.factory)
    return [
      'Todas',
      ...new Set([...factoryOptions, ...operationFactories, ...productFactories]),
    ]
  }, [factoryOptions, operations, products])

  const productFactories = useMemo(() => {
    return factories.filter((factory) => factory !== 'Todas')
  }, [factories])

  const filteredOperations = useMemo(() => {
    const search = filters.search.trim().toLowerCase()

    return operations
      .filter((operation) => {
        const matchesSearch =
          !search ||
          operation.name.toLowerCase().includes(search) ||
          operation.factory.toLowerCase().includes(search) ||
          operation.detail.toLowerCase().includes(search)
        const matchesFactory =
          filters.factory === 'Todas' ||
          operation.factory === filters.factory ||
          operation.factory.split(', ').includes(filters.factory)
        const matchesStatus =
          filters.status === 'Todos' || operation.status === filters.status
        const matchesFrom = !filters.from || operation.date >= filters.from
        const matchesTo = !filters.to || operation.date <= filters.to

        return (
          matchesSearch &&
          matchesFactory &&
          matchesStatus &&
          matchesFrom &&
          matchesTo
        )
      })
      .sort((firstOperation, secondOperation) => {
        if (firstOperation.date !== secondOperation.date) {
          return secondOperation.date.localeCompare(firstOperation.date)
        }

        return secondOperation.id - firstOperation.id
      })
  }, [filters, operations])

  const filteredProducts = useMemo(() => {
    const search = productFilters.search.trim().toLowerCase()
    return products.filter((product) => {
      const hasPrice = product.price !== null && product.price !== undefined
      const matchesSearch =
        !search ||
        product.name.toLowerCase().includes(search) ||
        product.factory.toLowerCase().includes(search)
      const matchesFactory =
        productFilters.factory === 'Todas' ||
        product.factory === productFilters.factory
      const matchesStatus =
        productFilters.status === 'Todos' ||
        product.status === productFilters.status
      const matchesPrice =
        productFilters.price === 'Todos' ||
        (productFilters.price === 'Con precio' && hasPrice) ||
        (productFilters.price === 'Sin precio' && !hasPrice)

      return (
        matchesSearch &&
        matchesFactory &&
        matchesStatus &&
        matchesPrice
      )
    })
  }, [productFilters, products])

  const clientRows = useMemo(() => {
    return clients.map((client) => {
      const clientOperations = operations.filter(
        (operation) =>
          operation.type === 'venta' && operation.name === client.name,
      )
      const total = sumBy(clientOperations, 'total')
      const paid = sumBy(clientOperations, 'payment')

      return {
        ...client,
        operations: clientOperations.length,
        paid,
        pending: total - paid,
        total,
      }
    })
  }, [clients, operations])

  const filteredClients = useMemo(() => {
    const search = clientSearch.trim().toLowerCase()
    return clientRows.filter((client) => {
      return (
        !search ||
        client.name.toLowerCase().includes(search) ||
        client.phone.toLowerCase().includes(search) ||
        client.note.toLowerCase().includes(search)
      )
    })
  }, [clientRows, clientSearch])

  const clientOptions = useMemo(() => {
    return clients.map((client) => client.name)
  }, [clients])

  const totals = useMemo(() => {
    const sales = filteredOperations.filter(
      (operation) => operation.type === 'venta',
    )
    const purchases = filteredOperations.filter(
      (operation) => operation.type === 'compra',
    )
    const purchasesTotal = sumBy(purchases, 'total')
    const salesPaid = sumBy(sales, 'payment')

    return {
      purchasesTotal,
      salesPaid,
      balanceTotal: salesPaid - purchasesTotal,
    }
  }, [filteredOperations])

  const balance = useMemo(() => {
    const sales = operations.filter((operation) => operation.type === 'venta')
    const purchases = operations.filter(
      (operation) => operation.type === 'compra',
    )
    const salesTotal = sumBy(sales, 'total')
    const salesPaid = sumBy(sales, 'payment')
    const purchasesTotal = sumBy(purchases, 'total')
    const pending = salesTotal - salesPaid
    const balanceTotal = salesPaid - purchasesTotal

    const byFactory = factories
      .filter((factory) => factory !== 'Todas')
      .map((factory) => {
        const factoryOperations = operations.filter(
          (operation) => operation.factory === factory,
        )
        return {
          factory,
          operations: factoryOperations.length,
          purchase: sumBy(factoryOperations, 'purchase'),
          payment: sumBy(factoryOperations, 'payment'),
          total: sumBy(factoryOperations, 'total'),
        }
      })

    return {
      byFactory,
      balanceTotal,
      pending,
      purchasesTotal,
      salesPaid,
      salesTotal,
    }
  }, [factories, operations])

  function updateFilter(name, value) {
    setFilters((current) => ({ ...current, [name]: value }))
  }

  function openOperationForm(type) {
    setOperationFormType(type)
    setEditingOperationId(null)
    setOperationForm({
      ...createEmptyOperationForm(),
      status: type === 'compra' ? 'Comprado' : 'Sin comprar',
    })
  }

  function openEditOperation(operation) {
    setOperationFormType(operation.type)
    setEditingOperationId(operation.id)
    setOperationForm({
      ...createEmptyOperationForm(),
      date: operation.date,
      name: operation.name,
      factory: operation.factory,
      detail: operation.detail,
      status: operation.status,
      purchase: String(operation.purchase),
      payment: String(operation.payment),
      total: String(operation.total),
      additionalExpenses: String(operation.additionalExpenses || ''),
      items: operation.items || [],
    })
  }

  function updateOperationForm(name, value) {
    setOperationForm((current) => {
      if (name === 'additionalExpenses' && operationFormType === 'compra') {
        const itemTotals = getOperationItemTotals(current.items)
        const additionalExpenses = Number(value) || 0

        return {
          ...current,
          additionalExpenses: value,
          purchase: current.items.length
            ? String(itemTotals.purchase + additionalExpenses)
            : current.purchase,
          total: current.items.length
            ? String(itemTotals.total + additionalExpenses)
            : current.total,
        }
      }

      return { ...current, [name]: value }
    })
  }

  function addOperation(event) {
    event.preventDefault()
    const itemTotals = getOperationItemTotals(operationForm.items)
    const additionalExpenses = Number(operationForm.additionalExpenses) || 0
    const calculatedPurchase =
      operationFormType === 'compra'
        ? itemTotals.purchase + additionalExpenses
        : itemTotals.purchase
    const calculatedTotal =
      operationFormType === 'compra'
        ? itemTotals.total + additionalExpenses
        : itemTotals.total
    const operationId = editingOperationId || Date.now()

    const operation = {
      id: operationId,
      type: operationFormType,
      date: operationForm.date,
      name: operationForm.name.trim(),
      factory:
        operationForm.factory.trim() ||
        summarizeItemFactories(operationForm.items),
      detail:
        operationForm.detail.trim() ||
        buildOperationDetail(operationForm.items) ||
        'Sin detalle',
      status: operationForm.status,
      purchase: Number(operationForm.purchase) || calculatedPurchase,
      payment: Number(operationForm.payment) || 0,
      total: Number(operationForm.total) || calculatedTotal,
      additionalExpenses,
      items: operationForm.items,
    }

    setOperations((current) => {
      if (editingOperationId) {
        return current.map((currentOperation) =>
          currentOperation.id === editingOperationId ? operation : currentOperation,
        )
      }

      return [operation, ...current]
    })
    setOperationFormType(null)
    setEditingOperationId(null)
  }

  function addOperationItem(event) {
    event.preventDefault()

    const productName = operationForm.itemProductName.trim().toLowerCase()
    const selectedFactory = operationForm.itemFactory.trim().toLowerCase()
    const matchingProducts = products.filter((currentProduct) => {
      const matchesFactory =
        !selectedFactory ||
        currentProduct.factory.toLowerCase() === selectedFactory
      const matchesProduct =
        currentProduct.name.toLowerCase() === productName ||
        currentProduct.name.toLowerCase().includes(productName)

      return matchesFactory && matchesProduct
    })
    const product = matchingProducts[0]
    const quantity = Math.max(1, Number(operationForm.itemQuantity) || 1)
    if (!product) return
    const unitPrice = product.price || product.cost

    const item = {
      id: Date.now(),
      productId: product.id,
      productName: product.name,
      factory: product.factory,
      quantity,
      unitCost: product.cost,
      unitPrice,
      linePurchase: product.cost * quantity,
      lineTotal:
        operationFormType === 'compra'
          ? product.cost * quantity
          : unitPrice * quantity,
    }

    setOperationForm((current) => {
      const items = [...current.items, item]
      const itemTotals = getOperationItemTotals(items)

      return {
        ...current,
        factory: summarizeItemFactories(items),
        itemFactory: product.factory,
        itemProductName: '',
        itemQuantity: 1,
        items,
        purchase: String(
          operationFormType === 'compra'
            ? itemTotals.purchase + (Number(current.additionalExpenses) || 0)
            : itemTotals.purchase,
        ),
        total: String(
          operationFormType === 'compra'
            ? itemTotals.total + (Number(current.additionalExpenses) || 0)
            : itemTotals.total,
        ),
      }
    })
  }

  function removeOperationItem(itemId) {
    setOperationForm((current) => {
      const items = current.items.filter((item) => item.id !== itemId)
      const itemTotals = getOperationItemTotals(items)

      return {
        ...current,
        factory: summarizeItemFactories(items),
        items,
        purchase: items.length ? String(itemTotals.purchase) : '',
        total: items.length ? String(itemTotals.total) : '',
      }
    })
  }

  function updateProductForm(name, value) {
    setProductForm((current) => {
      if (name !== 'cost') return { ...current, [name]: value }

      return {
        ...current,
        cost: value,
        price: getSuggestedSalePrice(value),
      }
    })
  }

  function updateProductFilter(name, value) {
    setProductFilters((current) => ({ ...current, [name]: value }))
  }

  function openProductForm() {
    setEditingProductId(null)
    setProductForm(emptyProductForm)
    setShowProductForm(true)
  }

  function openEditProduct(product) {
    setEditingProductId(product.id)
    setProductForm({
      name: product.name,
      factory: product.factory,
      cost: String(product.cost ?? ''),
      price: product.price === null || product.price === undefined ? '' : String(product.price),
      stock: String(product.stock ?? ''),
      status: product.status,
    })
    setShowProductForm(true)
  }

  function closeProductForm() {
    setShowProductForm(false)
    setEditingProductId(null)
    setProductForm(emptyProductForm)
  }

  function removeProduct(productId) {
    const product = products.find((currentProduct) => currentProduct.id === productId)
    if (!product) return

    const confirmed = window.confirm(
      `¿Eliminar ${product.name}? El producto dejará de estar disponible para nuevas compras y ventas. Las operaciones anteriores no se modificarán.`,
    )

    if (!confirmed) return

    setProducts((current) =>
      current.filter((currentProduct) => currentProduct.id !== productId),
    )
  }

  function saveProduct(event) {
    event.preventDefault()

    const product = {
      id: editingProductId ?? Date.now(),
      name: productForm.name.trim(),
      factory: productForm.factory.trim(),
      cost: Number(productForm.cost) || 0,
      price: productForm.price === '' ? null : Number(productForm.price) || 0,
      stock: Number(productForm.stock) || 0,
      status: productForm.status,
    }

    setProducts((current) => {
      if (!editingProductId) return [product, ...current]

      return current.map((currentProduct) =>
        currentProduct.id === editingProductId ? product : currentProduct,
      )
    })
    closeProductForm()
  }

  function addFactory(event) {
    event.preventDefault()

    const cleanName = newFactoryName.trim()
    if (!cleanName) return

    const alreadyExists = productFactories.some(
      (factory) => factory.toLowerCase() === cleanName.toLowerCase(),
    )

    if (!alreadyExists) {
      setFactoryOptions((current) => [...current, cleanName])
    }

    setEditingProductId(null)
    setProductForm((current) => ({ ...current, factory: cleanName }))
    setNewFactoryName('')
    setShowProductForm(true)
  }

  function updateClientForm(name, value) {
    setClientForm((current) => ({ ...current, [name]: value }))
  }

  function addClient(event) {
    event.preventDefault()

    const client = {
      id: Date.now(),
      name: clientForm.name.trim(),
      phone: clientForm.phone.trim(),
      note: clientForm.note.trim(),
    }

    setClients((current) => [client, ...current])
    setClientForm(emptyClientForm)
    setShowClientForm(false)
  }

  function removeClient(client) {
    if (client.pending > 0) {
      window.alert('Este cliente todavía tiene saldo pendiente. Primero registrá el pago para poder eliminarlo.')
      return
    }

    const confirmed = window.confirm(
      `¿Eliminar ${client.name}? Sus operaciones anteriores no se modificarán.`,
    )

    if (!confirmed) return

    setClients((current) =>
      current.filter((currentClient) => currentClient.id !== client.id),
    )
  }

  return (
    <main className="app-shell">
      <header className="top-bar">
        <div>
          <p className="eyebrow">Sistema de compras y ventas</p>
          <h1>{activeTab}</h1>
        </div>

        <nav className="main-nav" aria-label="Secciones principales">
          {tabs.map((tab) => (
            <button
              className={activeTab === tab ? 'active' : ''}
              key={tab}
              onClick={() => setActiveTab(tab)}
              type="button"
            >
              {tab}
            </button>
          ))}
        </nav>
      </header>

      {activeTab === 'REGISTRO' && (
        <RegisterView
          clients={clientOptions}
          factories={factories}
          filters={filters}
          form={operationForm}
          formType={operationFormType}
          isEditing={Boolean(editingOperationId)}
          onAdd={addOperation}
          onAddProductItem={addOperationItem}
          onCloseForm={() => {
            setOperationFormType(null)
            setEditingOperationId(null)
          }}
          onOpenForm={openOperationForm}
          onOpenEdit={openEditOperation}
          onRemoveProductItem={removeOperationItem}
          onUpdateFilter={updateFilter}
          onUpdateForm={updateOperationForm}
          operations={filteredOperations}
          products={products}
          totals={totals}
        />
      )}

      {activeTab === 'PRODUCTOS' && (
        <ProductsView
          factories={productFactories}
          filters={productFilters}
          form={productForm}
          isEditing={Boolean(editingProductId)}
          newFactoryName={newFactoryName}
          onAddFactory={addFactory}
          onCloseForm={closeProductForm}
          onOpenEdit={openEditProduct}
          onOpenForm={openProductForm}
          onSave={saveProduct}
          onUpdateFilter={updateProductFilter}
          onUpdateFactoryName={setNewFactoryName}
          onUpdateForm={updateProductForm}
          onRemoveProduct={removeProduct}
          products={filteredProducts}
          showForm={showProductForm}
        />
      )}

      {activeTab === 'CLIENTES' && (
        <ClientsView
          clients={filteredClients}
          form={clientForm}
          onAdd={addClient}
          onCloseForm={() => setShowClientForm(false)}
          onOpenForm={() => setShowClientForm(true)}
          onRemoveClient={removeClient}
          onSearch={setClientSearch}
          onUpdateForm={updateClientForm}
          search={clientSearch}
          showForm={showClientForm}
        />
      )}

      {activeTab === 'BALANCE' && <BalanceView balance={balance} />}
    </main>
  )
}

function RegisterView({
  clients,
  factories,
  filters,
  form,
  formType,
  isEditing,
  onAdd,
  onAddProductItem,
  onCloseForm,
  onOpenForm,
  onOpenEdit,
  onRemoveProductItem,
  onUpdateFilter,
  onUpdateForm,
  operations,
  products,
  totals,
}) {
  const selectableFactories = factories.filter((factory) => factory !== 'Todas')
  const productFactorySuggestions = [
    ...new Set(products.map((product) => product.factory)),
  ]
  const suggestedProducts = products.filter((product) => {
    return (
      !form.itemFactory ||
      product.factory.toLowerCase() === form.itemFactory.trim().toLowerCase()
    )
  })

  return (
    <section className="page-view">
      <div className="actions-row">
        <button
          className="primary-action"
          onClick={() => onOpenForm('venta')}
          type="button"
        >
          + Nueva venta / pedido
        </button>
        <button
          className="secondary-action"
          onClick={() => onOpenForm('compra')}
          type="button"
        >
          + Nueva compra
        </button>
        <button
          className="secondary-action"
          onClick={() => onUpdateFilter('status', 'Sin comprar')}
          type="button"
        >
          Pendientes de compra
        </button>
      </div>

      {formType && (
        <div className="modal-backdrop" role="presentation">
          <form
            aria-label={
              formType === 'venta' ? 'Nueva venta o pedido' : 'Nueva compra'
            }
            className="entry-form modal-window"
            onSubmit={onAdd}
          >
            <div className="form-title">
              <h2>
                {isEditing
                  ? 'Editar operación'
                  : formType === 'venta'
                  ? 'Nueva venta / pedido'
                  : 'Nueva compra'}
              </h2>
              <button type="button" onClick={onCloseForm}>
                Cerrar
              </button>
            </div>

            <div className="form-grid">
              <label>
                Fecha
                <input
                  onChange={(event) => onUpdateForm('date', event.target.value)}
                  required
                  type="date"
                  value={form.date}
                />
              </label>
              <label>
                Cliente / fábrica
                <input
                  list="client-options"
                  onChange={(event) => onUpdateForm('name', event.target.value)}
                  placeholder="Ej: María López"
                  required
                  value={form.name}
                />
              </label>
              <label>
                Fábrica
                <input
                  list="factory-options"
                  onChange={(event) =>
                    onUpdateForm('factory', event.target.value)
                  }
                  placeholder="Ej: Textil Norte"
                  value={form.factory}
                />
              </label>
              <datalist id="client-options">
                {clients.map((client) => (
                  <option key={client} value={client} />
                ))}
              </datalist>
              <datalist id="factory-options">
                {selectableFactories.map((factory) => (
                  <option key={factory} value={factory} />
                ))}
              </datalist>
              <label>
                Estado
                <select
                  onChange={(event) =>
                    onUpdateForm('status', event.target.value)
                  }
                  value={form.status}
                >
                {operationStatuses.map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>
              </label>
              <label className="wide">
                Detalle
                <input
                  onChange={(event) =>
                    onUpdateForm('detail', event.target.value)
                  }
                  placeholder="Opcional si cargás productos abajo"
                  value={form.detail}
                />
              </label>
              <label>
                Compra
                <input
                  min="0"
                  onChange={(event) =>
                    onUpdateForm('purchase', event.target.value)
                  }
                  placeholder="0"
                  type="number"
                  value={form.purchase}
                />
              </label>
              <label>
                Pago
                <input
                  min="0"
                  onChange={(event) =>
                    onUpdateForm('payment', event.target.value)
                  }
                  placeholder="0"
                  type="number"
                  value={form.payment}
                />
              </label>
              {formType === 'compra' && (
                <label>
                  Gastos adicionales
                  <input
                    min="0"
                    onChange={(event) =>
                      onUpdateForm('additionalExpenses', event.target.value)
                    }
                    placeholder="0"
                    type="number"
                    value={form.additionalExpenses}
                  />
                </label>
              )}
              <label>
                Total
                <input
                  min="0"
                  onChange={(event) => onUpdateForm('total', event.target.value)}
                  placeholder="0"
                  required
                  type="number"
                  value={form.total}
                />
              </label>
            </div>

            <section className="product-loader">
              <div>
                <h3>Productos</h3>
                <p>Agregá los productos de esta operación, uno por uno.</p>
              </div>

              <div className="product-picker">
                <label>
                  Fábrica
                  <input
                    list="item-factory-options"
                    onChange={(event) =>
                      onUpdateForm('itemFactory', event.target.value)
                    }
                    placeholder="Ej: Textil Norte"
                    value={form.itemFactory}
                  />
                </label>
                <label>
                  Producto
                  <input
                    list="item-product-options"
                    onChange={(event) =>
                      onUpdateForm('itemProductName', event.target.value)
                    }
                    placeholder="Escribí para buscar"
                    value={form.itemProductName}
                  />
                </label>
                <label>
                  Cantidad
                  <input
                    min="1"
                    onChange={(event) =>
                      onUpdateForm('itemQuantity', event.target.value)
                    }
                    type="number"
                    value={form.itemQuantity}
                  />
                </label>
                <button
                  aria-label="Agregar producto"
                  className="secondary-action icon-action"
                  onClick={onAddProductItem}
                  type="button"
                >
                  +
                </button>
                <datalist id="item-factory-options">
                  {productFactorySuggestions.map((factory) => (
                    <option key={factory} value={factory} />
                  ))}
                </datalist>
                <datalist id="item-product-options">
                  {suggestedProducts.map((product) => (
                    <option key={product.id} value={product.name} />
                  ))}
                </datalist>
              </div>

              {form.items.length > 0 && (
                <div className="line-items" aria-label="Productos cargados">
                  {form.items.map((item) => (
                    <div className="line-item" key={item.id}>
                      <div>
                        <strong>{item.productName}</strong>
                        <span>
                          {item.quantity} unidad(es) · {item.factory}
                        </span>
                      </div>
                      <div>
                        <strong>{formatCurrency(item.lineTotal)}</strong>
                        <button
                          type="button"
                          onClick={() => onRemoveProductItem(item.id)}
                        >
                          Quitar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <button className="save-action" type="submit">
              {isEditing ? 'Guardar cambios' : 'Guardar'}
            </button>
          </form>
        </div>
      )}

      <section className="filters" aria-label="Filtros del registro">
        <label className="search-field">
          Buscar
          <input
            onChange={(event) => onUpdateFilter('search', event.target.value)}
            placeholder="Cliente, fábrica o detalle"
            value={filters.search}
          />
        </label>

        <label>
          Fábrica
          <select
            onChange={(event) => onUpdateFilter('factory', event.target.value)}
            value={filters.factory}
          >
            {factories.map((factory) => (
              <option key={factory}>{factory}</option>
            ))}
          </select>
        </label>

        <label>
          Estado
          <select
            onChange={(event) => onUpdateFilter('status', event.target.value)}
            value={filters.status}
          >
            {statusFilters.map((status) => (
              <option key={status}>{status}</option>
            ))}
          </select>
        </label>

        <label>
          Desde
          <input
            onChange={(event) => onUpdateFilter('from', event.target.value)}
            type="date"
            value={filters.from}
          />
        </label>

        <label>
          Hasta
          <input
            onChange={(event) => onUpdateFilter('to', event.target.value)}
            type="date"
            value={filters.to}
          />
        </label>
      </section>

      <SummaryRow
        items={[
          ['Operaciones', operations.length],
          ['Compras realizadas', formatCurrency(totals.purchasesTotal)],
          ['Ingresos cobrados', formatCurrency(totals.salesPaid)],
          ['Saldo', formatCurrency(totals.balanceTotal)],
        ]}
      />

      <TableWrap label="Tabla de registro">
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Cliente/Fábrica</th>
              <th>Fábrica</th>
              <th>Detalle</th>
              <th>Compra</th>
              <th>Pago</th>
              <th>Total</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {operations.map((operation) => (
              <tr key={operation.id}>
                <td data-label="Fecha">{formatDate(operation.date)}</td>
                <td data-label="Cliente/Fábrica">
                  <strong>{operation.name}</strong>
                  <span className="mobile-status">{operation.status}</span>
                </td>
                <td data-label="Fábrica">{operation.factory}</td>
                <td data-label="Detalle">
                  <span>{operation.detail}</span>
                  <small>{operation.status}</small>
                </td>
                <td data-label="Compra">{formatCurrency(operation.purchase)}</td>
                <td data-label="Pago">{formatCurrency(operation.payment)}</td>
                <td data-label="Total">
                  <strong>{formatCurrency(operation.total)}</strong>
                </td>
                <td data-label="Acción">
                  <button
                    className="table-action"
                    onClick={() => onOpenEdit(operation)}
                    type="button"
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableWrap>
    </section>
  )
}

function ProductsView({
  factories,
  filters,
  form,
  isEditing,
  newFactoryName,
  onAddFactory,
  onCloseForm,
  onOpenEdit,
  onOpenForm,
  onSave,
  onUpdateFilter,
  onUpdateFactoryName,
  onUpdateForm,
  onRemoveProduct,
  products,
  showForm,
}) {
  const totalStock = sumBy(products, 'stock')
  const stockValue = products.reduce(
    (summary, product) => summary + product.cost * product.stock,
    0,
  )

  return (
    <section className="page-view">
      <div className="actions-row">
        <button className="primary-action" onClick={onOpenForm} type="button">
          + Nuevo producto
        </button>
      </div>

      <div className="filters">
        <label className="search-field">
          Buscar producto
          <input
            onChange={(event) => onUpdateFilter('search', event.target.value)}
            placeholder="Nombre o fábrica"
            value={filters.search}
          />
        </label>
        <label>
          Fábrica
          <select
            onChange={(event) => onUpdateFilter('factory', event.target.value)}
            value={filters.factory}
          >
            <option>Todas</option>
            {factories.map((factory) => (
              <option key={factory} value={factory}>
                {factory}
              </option>
            ))}
          </select>
        </label>
        <label>
          Estado
          <select
            onChange={(event) => onUpdateFilter('status', event.target.value)}
            value={filters.status}
          >
            {productStatusFilters.map((status) => (
              <option key={status}>{status}</option>
            ))}
          </select>
        </label>
        <label>
          Precio
          <select
            onChange={(event) => onUpdateFilter('price', event.target.value)}
            value={filters.price}
          >
            <option>Todos</option>
            <option>Con precio</option>
            <option>Sin precio</option>
          </select>
        </label>
      </div>

      <form className="factory-strip" onSubmit={onAddFactory}>
        <label>
          Nueva fábrica
          <input
            onChange={(event) => onUpdateFactoryName(event.target.value)}
            placeholder="Ej: Taller Centro"
            value={newFactoryName}
          />
        </label>
        <button className="secondary-action" type="submit">
          + Agregar fábrica
        </button>
      </form>

      {showForm && (
        <div className="modal-backdrop">
          <form className="entry-form modal-window" onSubmit={onSave}>
            <div className="form-title">
              <h2>{isEditing ? 'Editar producto' : 'Nuevo producto'}</h2>
              <button type="button" onClick={onCloseForm}>
                Cerrar
              </button>
            </div>
            <div className="form-grid">
              <label className="wide">
                Producto
                <input
                  onChange={(event) => onUpdateForm('name', event.target.value)}
                  placeholder="Ej: Remera negra"
                  required
                  value={form.name}
                />
              </label>
              <label>
                Fábrica
                <select
                  onChange={(event) => onUpdateForm('factory', event.target.value)}
                  required
                  value={form.factory}
                >
                  <option value="">Elegir fábrica</option>
                  {factories.map((factory) => (
                    <option key={factory} value={factory}>
                      {factory}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Estado
                <select
                  onChange={(event) => onUpdateForm('status', event.target.value)}
                  value={form.status}
                >
                  <option>Activo</option>
                  <option>Revisar</option>
                  <option>Sin stock</option>
                </select>
              </label>
              <label>
                Costo
                <input
                  min="0"
                  onChange={(event) => onUpdateForm('cost', event.target.value)}
                  placeholder="0"
                  type="number"
                  value={form.cost}
                />
              </label>
              <label>
                Precio venta
                <input
                  min="0"
                  onChange={(event) => onUpdateForm('price', event.target.value)}
                  placeholder="Dejalo vacío si falta"
                  type="number"
                  value={form.price}
                />
              </label>
              <label>
                Stock
                <input
                  min="0"
                  onChange={(event) => onUpdateForm('stock', event.target.value)}
                  placeholder="0"
                  type="number"
                  value={form.stock}
                />
              </label>
            </div>
            <button className="save-action" type="submit">
              {isEditing ? 'Guardar cambios' : 'Guardar producto'}
            </button>
          </form>
        </div>
      )}

      <SummaryRow
        items={[
          ['Productos', products.length],
          ['Unidades', totalStock],
          ['Valor stock', formatCurrency(stockValue)],
        ]}
      />

      <TableWrap label="Tabla de productos">
        <table>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Fábrica</th>
              <th>Costo</th>
              <th>Precio venta</th>
              <th>Stock</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td data-label="Producto">
                  <strong>{product.name}</strong>
                </td>
                <td data-label="Fábrica">{product.factory}</td>
                <td data-label="Costo">{formatCurrency(product.cost)}</td>
                <td data-label="Precio venta">
                  {formatOptionalCurrency(product.price)}
                </td>
                <td data-label="Stock">{product.stock}</td>
                <td data-label="Estado">{product.status}</td>
                <td data-label="Acción">
                  <div className="table-actions">
                    <button
                      className="table-action"
                      onClick={() => onOpenEdit(product)}
                      type="button"
                    >
                      Editar
                    </button>
                    <button
                      className="table-action"
                      onClick={() => onRemoveProduct(product.id)}
                      type="button"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableWrap>
    </section>
  )
}

function ClientsView({
  clients,
  form,
  onAdd,
  onCloseForm,
  onOpenForm,
  onRemoveClient,
  onSearch,
  onUpdateForm,
  search,
  showForm,
}) {
  const pendingTotal = clients.reduce(
    (summary, client) => summary + client.pending,
    0,
  )

  return (
    <section className="page-view">
      <div className="actions-row split-actions">
        <button className="primary-action" onClick={onOpenForm} type="button">
          + Nuevo cliente
        </button>
        <label className="compact-search">
          Buscar cliente
          <input
            onChange={(event) => onSearch(event.target.value)}
            placeholder="Nombre, teléfono o nota"
            value={search}
          />
        </label>
      </div>

      {showForm && (
        <form className="entry-form" onSubmit={onAdd}>
          <div className="form-title">
            <h2>Nuevo cliente</h2>
            <button type="button" onClick={onCloseForm}>
              Cerrar
            </button>
          </div>
          <div className="form-grid">
            <label>
              Nombre
              <input
                onChange={(event) => onUpdateForm('name', event.target.value)}
                placeholder="Ej: María López"
                required
                value={form.name}
              />
            </label>
            <label>
              Teléfono
              <input
                onChange={(event) => onUpdateForm('phone', event.target.value)}
                placeholder="Ej: 11 5555-1234"
                value={form.phone}
              />
            </label>
            <label className="wide">
              Nota
              <input
                onChange={(event) => onUpdateForm('note', event.target.value)}
                placeholder="Ej: Retira por local"
                value={form.note}
              />
            </label>
          </div>
          <button className="save-action" type="submit">
            Guardar cliente
          </button>
        </form>
      )}

      <SummaryRow
        items={[
          ['Clientes', clients.length],
          ['A cobrar', formatCurrency(pendingTotal)],
        ]}
      />

      <TableWrap label="Tabla de clientes">
        <table>
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Teléfono</th>
              <th>Nota</th>
              <th>Operaciones</th>
              <th>Pagó</th>
              <th>A cobrar</th>
              <th>Total vendido</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id}>
                <td data-label="Cliente">
                  <strong>{client.name}</strong>
                </td>
                <td data-label="Teléfono">{client.phone || '-'}</td>
                <td data-label="Nota">{client.note || '-'}</td>
                <td data-label="Operaciones">{client.operations}</td>
                <td data-label="Pagó">{formatCurrency(client.paid)}</td>
                <td data-label="A cobrar">
                  {formatCurrency(client.pending)}
                </td>
                <td data-label="Total vendido">
                  <strong>{formatCurrency(client.total)}</strong>
                </td>
                <td data-label="Acción">
                  <button
                    className="table-action"
                    onClick={() => onRemoveClient(client)}
                    type="button"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableWrap>
    </section>
  )
}

function BalanceView({ balance }) {
  return (
    <section className="page-view">
      <SummaryRow
        items={[
          ['Ingresos cobrados', formatCurrency(balance.salesPaid)],
          ['Compras realizadas', formatCurrency(balance.purchasesTotal)],
          ['Saldo', formatCurrency(balance.balanceTotal)],
          ['A cobrar', formatCurrency(balance.pending)],
        ]}
      />

      <section className="balance-grid">
        <div className="simple-panel">
          <h2>Resumen general</h2>
          <dl>
            <div>
              <dt>Ingresos cobrados</dt>
              <dd>{formatCurrency(balance.salesPaid)}</dd>
            </div>
            <div>
              <dt>Compras realizadas</dt>
              <dd>{formatCurrency(balance.purchasesTotal)}</dd>
            </div>
            <div>
              <dt>Saldo actual</dt>
              <dd>{formatCurrency(balance.balanceTotal)}</dd>
            </div>
            <div>
              <dt>Pendiente de cobro</dt>
              <dd>{formatCurrency(balance.pending)}</dd>
            </div>
          </dl>
        </div>

        <div className="simple-panel">
          <h2>Lectura rápida</h2>
          <p>
            Este balance se calcula con los movimientos cargados en REGISTRO.
            El saldo usa solo dinero efectivamente cobrado menos compras
            realizadas. Lo pendiente queda separado.
          </p>
        </div>
      </section>

      <TableWrap label="Balance por fábrica">
        <table>
          <thead>
            <tr>
              <th>Fábrica</th>
              <th>Operaciones</th>
              <th>Compra</th>
              <th>Pago</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {balance.byFactory.map((factory) => (
              <tr key={factory.factory}>
                <td data-label="Fábrica">
                  <strong>{factory.factory}</strong>
                </td>
                <td data-label="Operaciones">{factory.operations}</td>
                <td data-label="Compra">{formatCurrency(factory.purchase)}</td>
                <td data-label="Pago">{formatCurrency(factory.payment)}</td>
                <td data-label="Total">
                  <strong>{formatCurrency(factory.total)}</strong>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableWrap>
    </section>
  )
}

function SummaryRow({ items }) {
  return (
    <section
      className="summary-row"
      style={{ '--summary-columns': items.length }}
      aria-label="Resumen"
    >
      {items.map(([label, value]) => (
        <div key={label}>
          <span>{label}</span>
          <strong>{value}</strong>
        </div>
      ))}
    </section>
  )
}

function TableWrap({ children, label }) {
  return (
    <section className="table-wrap" aria-label={label}>
      {children}
    </section>
  )
}

function sumBy(items, key) {
  return items.reduce((summary, item) => summary + item[key], 0)
}

function getOperationItemTotals(items) {
  return items.reduce(
    (summary, item) => ({
      purchase: summary.purchase + item.linePurchase,
      total: summary.total + item.lineTotal,
    }),
    { purchase: 0, total: 0 },
  )
}

function summarizeItemFactories(items) {
  return [...new Set(items.map((item) => item.factory))].join(', ')
}

function buildOperationDetail(items) {
  return items
    .map((item) => `${item.quantity} x ${item.productName}`)
    .join(' · ')
}

function formatCurrency(value) {
  return currencyFormatter.format(value)
}

function formatOptionalCurrency(value) {
  return value ? formatCurrency(value) : 'Sin precio'
}

function formatDate(value) {
  return new Intl.DateTimeFormat('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(`${value}T00:00:00`))
}

export default App
