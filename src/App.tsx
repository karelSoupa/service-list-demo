import { useState, KeyboardEvent } from 'react'
import { Button } from "./components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./components/ui/dropdown-menu"
import { Separator } from "./components/ui/separator"
import { Plus, Edit2, ChevronRight, Check } from 'lucide-react'

interface Service {
  id: string
  name: string
  description: string
  categoryIds: string[]
}

interface ServiceCategory {
  id: string
  name: string
  description: string
  parentId: string | null
}

function generateId() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

export default function App() {
  const [categories, setCategories] = useState<ServiceCategory[]>([
    {
      id: 'cat1',
      name: 'Hair Services',
      description: 'Professional hair care and styling services',
      parentId: null
    },
    {
      id: 'cat2',
      name: 'Haircuts',
      description: 'Professional haircutting services for all hair types',
      parentId: 'cat1'
    },
    {
      id: 'cat3',
      name: 'Hair Coloring',
      description: 'Professional hair coloring and highlighting services',
      parentId: 'cat1'
    },
    {
      id: 'cat4',
      name: 'Hair Treatments',
      description: 'Specialized hair treatments and deep conditioning',
      parentId: 'cat1'
    },
    {
      id: 'cat5',
      name: 'Massage',
      description: 'Professional massage therapy services',
      parentId: null
    },
    {
      id: 'cat6',
      name: 'Body Massage',
      description: 'Full body massage and relaxation treatments',
      parentId: 'cat5'
    },
    {
      id: 'cat7',
      name: 'Facial Massage',
      description: 'Specialized facial massage and treatments',
      parentId: 'cat5'
    },
    {
      id: 'cat8',
      name: 'Cosmetics',
      description: 'Professional makeup and skincare services',
      parentId: null
    },
    {
      id: 'cat9',
      name: 'Makeup',
      description: 'Professional makeup application and consultation',
      parentId: 'cat8'
    },
    {
      id: 'cat10',
      name: 'Skincare',
      description: 'Professional skincare treatments and consultation',
      parentId: 'cat8'
    },
    {
      id: 'uncategorized',
      name: 'Uncategorized',
      description: 'Services without a specific category',
      parentId: null
    }
  ])

  const [services, setServices] = useState<Service[]>([
    {
      id: 'svc1',
      name: 'Men\'s Haircut',
      description: 'Professional haircut tailored to men\'s styles',
      categoryIds: ['cat2']
    },
    {
      id: 'svc2',
      name: 'Women\'s Haircut',
      description: 'Professional haircut tailored to women\'s styles',
      categoryIds: ['cat2']
    },
    {
      id: 'svc3',
      name: 'Highlights',
      description: 'Professional hair highlighting service',
      categoryIds: ['cat3']
    },
    {
      id: 'svc4',
      name: 'Full Color',
      description: 'Complete hair coloring service',
      categoryIds: ['cat3']
    },
    {
      id: 'svc5',
      name: 'Keratin Treatment',
      description: 'Professional keratin smoothing treatment',
      categoryIds: ['cat4']
    },
    {
      id: 'svc6',
      name: 'Deep Conditioning',
      description: 'Intensive hair conditioning treatment',
      categoryIds: ['cat4']
    },
    {
      id: 'svc7',
      name: 'Swedish Massage',
      description: 'Relaxing full body Swedish massage',
      categoryIds: ['cat6']
    },
    {
      id: 'svc8',
      name: 'Deep Tissue Massage',
      description: 'Intensive deep tissue massage therapy',
      categoryIds: ['cat6']
    },
    {
      id: 'svc9',
      name: 'Facial Massage',
      description: 'Relaxing facial massage treatment',
      categoryIds: ['cat7']
    },
    {
      id: 'svc10',
      name: 'Bridal Makeup',
      description: 'Complete bridal makeup package',
      categoryIds: ['cat9']
    },
    {
      id: 'svc11',
      name: 'Evening Makeup',
      description: 'Professional evening makeup application',
      categoryIds: ['cat9']
    },
    {
      id: 'svc12',
      name: 'Facial Treatment',
      description: 'Professional facial treatment and care',
      categoryIds: ['cat10']
    },
    {
      id: 'svc13',
      name: 'Skin Consultation',
      description: 'Professional skin analysis and consultation',
      categoryIds: ['cat10']
    },
    {
      id: 'svc14',
      name: 'Gift Card',
      description: 'Purchase a gift card for any service',
      categoryIds: ['uncategorized']
    },
    {
      id: 'svc15',
      name: 'Consultation',
      description: 'General consultation for any service',
      categoryIds: ['uncategorized']
    },
    {
      id: 'svc16',
      name: 'Package Deal',
      description: 'Custom package combining multiple services',
      categoryIds: ['uncategorized']
    }
  ])

  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [showServiceModal, setShowServiceModal] = useState(false)
  const [showExistingServiceModal, setShowExistingServiceModal] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState('')
  const [newCategoryDescription, setNewCategoryDescription] = useState('')
  const [newServiceName, setNewServiceName] = useState('')
  const [newServiceDescription, setNewServiceDescription] = useState('')
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([])

  const addCategory = (parentId: string | null = null) => {
    if (!newCategoryName.trim()) return
    
    setCategories(prevCategories => [
      ...prevCategories,
      {
        id: generateId(),
        name: newCategoryName,
        description: newCategoryDescription,
        parentId
      }
    ])
    
    setNewCategoryName('')
    setNewCategoryDescription('')
    setShowCategoryModal(false)
  }

  const addService = () => {
    if (!newServiceName.trim()) return
    
    setServices(prevServices => [
      ...prevServices,
      {
        id: generateId(),
        name: newServiceName,
        description: newServiceDescription,
        categoryIds: selectedCategoryIds
      }
    ])
    
    setNewServiceName('')
    setNewServiceDescription('')
    setShowServiceModal(false)
  }

  const updateServiceCategories = () => {
    if (!editingService) return
    
    setServices(prevServices =>
      prevServices.map(service =>
        service.id === editingService.id
          ? { ...service, categoryIds: selectedCategoryIds }
          : service
      )
    )
    
    setEditingService(null)
    setShowExistingServiceModal(false)
  }

  const getChildCategories = (parentId: string | null) => {
    return categories.filter(category => category.parentId === parentId)
  }

  const getCategoryServices = (categoryId: string) => {
    return services.filter(service => service.categoryIds.includes(categoryId))
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, action: () => void) => {
    if (e.key === 'Enter') {
      action()
    }
  }

  const renderCategoryTree = (parentId: string | null = null, level = 0) => {
    const childCategories = getChildCategories(parentId)
    
    return childCategories.map(category => (
      <div key={category.id} className="space-y-2">
        <div 
          className="flex items-center gap-2 group border border-blue-100 rounded px-2 py-1"
          style={{ marginLeft: `${level * 1.5}rem` }}
        >
          <ChevronRight className="h-4 w-4 text-gray-400" />
          <div className="flex-1">
            <div className="text-gray-600">{category.name}</div>
            <div className="text-sm text-gray-400">{category.description}</div>
          </div>
          {category.id !== 'uncategorized' && (
            <div className="ml-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Plus className="h-4 w-4 text-gray-500" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white/90 backdrop-blur-sm">
                  <DropdownMenuItem
                    onClick={() => {
                      setSelectedCategoryId(category.id)
                      setShowCategoryModal(true)
                    }}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Add Category
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      setSelectedCategoryIds([category.id])
                      setShowServiceModal(true)
                    }}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Add Service
                  </DropdownMenuItem>
                  <Separator className="my-2" />
                  <DropdownMenuItem
                    onClick={() => {
                      setSelectedCategoryIds([category.id])
                      setShowExistingServiceModal(true)
                    }}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Add Existing Service
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>

        {getCategoryServices(category.id).map(service => (
          <div
            key={service.id}
            className="flex items-center gap-2 group border border-purple-100 rounded px-2 py-1"
            style={{ marginLeft: `${(level + 1) * 1.5}rem` }}
          >
            <div className="flex-1">
              <div className="text-gray-500">{service.name}</div>
              <div className="text-sm text-gray-400">{service.description}</div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto h-8 w-8"
              onClick={() => {
                setEditingService(service)
                setSelectedCategoryIds(service.categoryIds)
                setShowExistingServiceModal(true)
              }}
            >
              <Edit2 className="h-4 w-4 text-gray-400" />
            </Button>
          </div>
        ))}

        {renderCategoryTree(category.id, level + 1)}
      </div>
    ))
  }

  const renderCategoryCheckboxTree = (parentId: string | null = null, level = 0) => {
    const childCategories = getChildCategories(parentId)
    
    return childCategories.map(category => (
      <div key={category.id} className="space-y-1">
        <label
          className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-50 cursor-pointer border border-blue-100"
          style={{ marginLeft: `${level * 1.5}rem` }}
        >
          <input
            type="checkbox"
            checked={selectedCategoryIds.includes(category.id)}
            onChange={(e) => {
              if (e.target.checked) {
                setSelectedCategoryIds([...selectedCategoryIds, category.id])
              } else {
                setSelectedCategoryIds(
                  selectedCategoryIds.filter(id => id !== category.id)
                )
              }
            }}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500/20"
          />
          <span className="text-gray-600">{category.name}</span>
          {selectedCategoryIds.includes(category.id) && (
            <Check className="h-4 w-4 text-blue-600 ml-auto" />
          )}
        </label>
        {renderCategoryCheckboxTree(category.id, level + 1)}
      </div>
    ))
  }

  return (
    <div className="min-h-screen bg-gray-50/50 p-8">
      <div className="mx-auto max-w-4xl bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-700">Services</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white/90 backdrop-blur-sm">
              <DropdownMenuItem
                onClick={() => {
                  setSelectedCategoryId(null)
                  setShowCategoryModal(true)
                }}
                className="text-gray-600 hover:text-gray-900"
              >
                Add Category
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setSelectedCategoryIds([])
                  setShowServiceModal(true)
                }}
                className="text-gray-600 hover:text-gray-900"
              >
                Add Service
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="space-y-4">
          {renderCategoryTree()}
          {services
            .filter(service => service.categoryIds.length === 0)
            .map(service => (
              <div key={service.id} className="flex items-center gap-2 group pl-6">
                <span className="text-gray-500">{service.name}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-auto h-8 w-8"
                  onClick={() => {
                    setEditingService(service)
                    setSelectedCategoryIds(service.categoryIds)
                    setShowExistingServiceModal(true)
                  }}
                >
                  <Edit2 className="h-4 w-4 text-gray-400" />
                </Button>
              </div>
            ))}
        </div>

        <Dialog open={showCategoryModal} onOpenChange={setShowCategoryModal}>
          <DialogContent className="bg-white">
            <DialogHeader>
              <DialogTitle>Add Category</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, () => addCategory(selectedCategoryId))}
                placeholder="Category name"
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
              <textarea
                value={newCategoryDescription}
                onChange={(e) => setNewCategoryDescription(e.target.value)}
                placeholder="Category description"
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                rows={3}
              />
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setNewCategoryName('')
                    setNewCategoryDescription('')
                    setShowCategoryModal(false)
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={() => addCategory(selectedCategoryId)}>
                  Add Category
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showServiceModal} onOpenChange={setShowServiceModal}>
          <DialogContent className="bg-white">
            <DialogHeader>
              <DialogTitle>Add Service</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <input
                type="text"
                value={newServiceName}
                onChange={(e) => setNewServiceName(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, addService)}
                placeholder="Service name"
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
              <textarea
                value={newServiceDescription}
                onChange={(e) => setNewServiceDescription(e.target.value)}
                placeholder="Service description"
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                rows={3}
              />
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setNewServiceName('')
                    setNewServiceDescription('')
                    setShowServiceModal(false)
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={addService}>
                  Add Service
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showExistingServiceModal} onOpenChange={setShowExistingServiceModal}>
          <DialogContent className="bg-white">
            <DialogHeader>
              <DialogTitle>
                {editingService ? 'Edit Service Categories' : 'Add Existing Service'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="max-h-60 overflow-y-auto space-y-2">
                {renderCategoryCheckboxTree()}
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditingService(null)
                    setSelectedCategoryIds([])
                    setShowExistingServiceModal(false)
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={updateServiceCategories}>
                  {editingService ? 'Update Categories' : 'Add to Categories'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
