import { IconButton, Typography } from '@mui/material'
import { cloneDeep } from 'lodash'
import { FC } from 'react'
import { DialogContext, DialogInputType } from '../../App'
import { ModelLayoutItemType } from '../../Types/Model'
import Icon from '../Icon'
import Dropzone from './DropZone'
import styles from './styles.module.scss'

interface ItemType {
  label: string
  nestable?: true
  preview?: FC<{ children: JSX.Element | JSX.Element[] }>
  settings?: DialogInputType[]
}

type onChange = (newLayout: ModelLayoutItemType[]) => void

const LayoutItem: React.FC<{
  item: ItemType
  layoutItem: ModelLayoutItemType
  items: { [key: string]: ItemType }
  onChange: (newLayoutItem: ModelLayoutItemType) => void
}> = ({ item, layoutItem, items, onChange }) => {
  return (
    <DialogContext.Consumer>
      {({ setDialog }) => (
        <MaybeWrapper Wrapper={item.preview}>
          <div className={styles.item} title={item.label}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div />
              <Typography style={{ textAlign: 'center' }} variant="subtitle2">
                {item.label}
              </Typography>
              <div>
                <IconButton
                  onClick={() =>
                    setDialog({
                      show: true,
                      title: `${item.label} settings`,
                      form: item.settings,
                      actions: [
                        {
                          label: 'Update',
                          onClick: (form) => console.log(form),
                        },
                      ],
                    })
                  }
                >
                  <Icon icon="tune-variant" size={15} />
                </IconButton>
              </div>
            </div>
            {item.nestable && (
              <Dropzone
                onDropped={(a) => {
                  onChange({
                    ...layoutItem,
                    items: [...(layoutItem.items ?? []), a],
                  })
                }}
              >
                <>
                  {(layoutItem.items ?? []).map(
                    (childLayoutItem, childLayoutItemIndex) => {
                      const childItem = items[childLayoutItem.type]
                      return (
                        <LayoutItem
                          item={childItem}
                          layoutItem={childLayoutItem}
                          key={childLayoutItem.id}
                          items={items}
                          onChange={(newChildLayoutItem) => {
                            const newItems = cloneDeep(layoutItem.items)
                            newItems[childLayoutItemIndex] = newChildLayoutItem
                            onChange({
                              ...layoutItem,
                              items: newItems,
                            })
                          }}
                        />
                      )
                    }
                  )}
                </>
              </Dropzone>
            )}
          </div>
        </MaybeWrapper>
      )}
    </DialogContext.Consumer>
  )
}

const LayoutDesigner: React.FC<{
  layout: ModelLayoutItemType[]
  onChange: onChange
  items: { [key: string]: ItemType }
}> = ({ layout, onChange, items }) => {
  // Vars

  // Lifecycle

  // Functions

  // UI
  return (
    <div className={styles['layout-designer']}>
      {layout.map((layoutItem, layoutItemIndex) => {
        const item = items[layoutItem.type]
        return (
          <LayoutItem
            item={item}
            layoutItem={layoutItem}
            key={layoutItem.id}
            items={items}
            onChange={(newLayoutItem) => {
              const newLayout = cloneDeep(layout)
              newLayout[layoutItemIndex] = newLayoutItem
              onChange(newLayout)
            }}
          />
        )
      })}
      <Dropzone
        onDropped={(droppedItem) => onChange([...layout, droppedItem])}
      />
    </div>
  )
}

export default LayoutDesigner

const MaybeWrapper: FC<{
  children: JSX.Element
  Wrapper?: FC<{ children: JSX.Element | JSX.Element[] }>
}> = ({ children, Wrapper }) =>
  Wrapper ? <Wrapper>{children}</Wrapper> : <>{children}</>
