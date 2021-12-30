'use strict'

let blocksList
let objectsBlocksList


const initBlocksList = () => {
    blocksList = [...document.querySelector('.square-body').children]
    return blocksList
}

const initObjectsBlocksList = () => {
    objectsBlocksList = Array.from({length: 5}, (item, index) => {
        return Array.from({length: 5}, (v, i) => {
            return {
                index: (index + i) + (index * 4),
                block: blocksList[(index + i) + (index * 4)]
            }
        })
    })
    return objectsBlocksList
}

initBlocksList()
initObjectsBlocksList()

document.querySelector('.btn-reset').addEventListener('click', () => {

    let objectsBlocksListReduce = objectsBlocksList.reduce((acc, cur) => {
        cur.map(e => acc.push(e))
        return acc
    }, []).sort((a, b) => a['index'] - b['index'])

    const del = document.querySelector('.square-body')

    del.querySelectorAll('.block').forEach((item) => {
        item.remove()
    })

    objectsBlocksListReduce.forEach(({block}) => {
        del.append(block)
    })

    initBlocksList()
    initObjectsBlocksList()
})


const swapNodes = (n1, n2, i1, i2) => {
    let p1 = n1.parentNode
    let p2 = n2.parentNode

    if ( p1.isEqualNode(p2) && i1 < i2 ) {
        i2++
    }

    p1.insertBefore(n2, p1.children[i1])
    p2.insertBefore(n1, p2.children[i2])
}

const directData = (index, direction) => {
    let nextPosition = []
    const curPosition = objectsBlocksList.reduce((acc, crv, arrIndex) => {
        crv.forEach((item, crvIndex) => {
            if (item['index'] === +index) {
                acc[1] = crvIndex
                acc[0] = arrIndex
            }
        })
        return acc
    },[])

    if ((curPosition[0] === 0 && curPosition[1] === 0) && (direction === 'top' || direction === 'left')) {
        return
    } else if ((curPosition[0] === 4 && curPosition[1] === 4) && (direction === 'bottom' || direction === 'right')) {
        return
    } else if (curPosition[0] === 0 && direction === 'top') {
        return
    } else if (curPosition[0] === 4 && direction === 'bottom') {
        return
    }
    if (direction === 'top') {
        nextPosition[0] = curPosition[0] - 1
        nextPosition[1] = curPosition[1]
    } else if (direction === 'bottom') {
        nextPosition[0] = curPosition[0] + 1
        nextPosition[1] = curPosition[1]
    } else if (direction === 'right') {
        if (curPosition[1] === 4) {
            nextPosition[0] = curPosition[0] + 1
            nextPosition[1] = 0
        } else {
            nextPosition[0] = curPosition[0]
            nextPosition[1] = curPosition[1] + 1
        }
    } else if (direction === 'left') {
        if (curPosition[1] === 0) {
            nextPosition[0] = curPosition[0] - 1
            nextPosition[1] = 4
        } else {
            nextPosition[0] = curPosition[0]
            nextPosition[1] = curPosition[1] - 1
        }
    }

    const curPos = document.querySelector(`[data-index='${Object.values(objectsBlocksList[curPosition[0]][curPosition[1]])[0]}'`)
    const nextPos = document.querySelector(`[data-index='${Object.values(objectsBlocksList[nextPosition[0]][nextPosition[1]])[0]}'`)

    const cur = objectsBlocksList[curPosition[0]][curPosition[1]]
    const next = objectsBlocksList[nextPosition[0]][nextPosition[1]]

    swapNodes(curPos, nextPos, curPosition[0] * 5 + curPosition[1], nextPosition[0] * 5 + nextPosition[1])

    objectsBlocksList[nextPosition[0]][nextPosition[1]] = cur
    objectsBlocksList[curPosition[0]][curPosition[1]] = next
}

blocksList.forEach((block, index) => {
    block.setAttribute('data-index', index)
    block.addEventListener('click', (e) => {
        const target = e.target
        const indexData = target.closest('.block').getAttribute('data-index')

        if (target.closest('.arrow')) {
            let cList = [...target.closest('.arrow').classList]
            const direction = cList.filter((cListItem) => cListItem !== 'arrow').toString()
            directData(indexData, direction)
        }
    })
})


