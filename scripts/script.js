'use strict'

const items = [...document.querySelector('.square-body').children]
const arr = Array.from({length: 5}, (item, index) => {
    return Array.from({length: 5}, (v, i) => {
        return (index + i) + (index * 4)
    })
})

const swapNodes = (n1, n2) => {
    let p1 = n1.parentNode
    let p2 = n2.parentNode
    let i1, i2

    if ( !p1 || !p2 || p1.isEqualNode(n2) || p2.isEqualNode(n1) ) return

    for (let i = 0; i < p1.children.length; i++) {
        if (p1.children[i].isEqualNode(n1)) {
            i1 = i
        }
    }
    for (let i = 0; i < p2.children.length; i++) {
        if (p2.children[i].isEqualNode(n2)) {
            i2 = i
        }
    }

    if ( p1.isEqualNode(p2) && i1 < i2 ) {
        i2++
    }
    p1.insertBefore(n2, p1.children[i1])
    p2.insertBefore(n1, p2.children[i2])
}

const directData = (index, direction) => {
    let nextPosition = []
    const curPosition = arr.reduce((acc, crv, arrIndex) => {
        crv.forEach((item, crvIndex) => {
            if (item === +index) {
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

    const curPos = document.querySelector(`[data-index='${arr[curPosition[0]][curPosition[1]]}'`)
    const nextPos = document.querySelector(`[data-index='${arr[nextPosition[0]][nextPosition[1]]}'`)
    const cur = arr[curPosition[0]][curPosition[1]]
    const next = arr[nextPosition[0]][nextPosition[1]]

    swapNodes(curPos, nextPos)

    arr[nextPosition[0]][nextPosition[1]] = cur
    arr[curPosition[0]][curPosition[1]] = next
}

items.forEach((item, index) => {
    item.setAttribute('data-index', index)
    item.addEventListener('click', (e) => {
        const target = e.target
        const indexData = target.closest('.block').getAttribute('data-index')

        if (target.closest('.arrow')) {
            let cList = [...target.closest('.arrow').classList]
            const direction = cList.filter((cListItem) => cListItem !== 'arrow').toString()
            directData(indexData, direction)
        }

    })
})

document.querySelector('.btn-reset').addEventListener('click', () => {
    window.location.reload()
})

