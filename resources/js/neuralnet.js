const neuralNetContainer = document.getElementById('neuralnet')

const initializeNeuralNet = () => {
    const nodes = [4, 6, 6, 6, 2]
    const nodeElements = []
    neuralNetContainer.innerHTML = '<svg id="connections"></svg>'

    for (i = 0; i < nodes.length; i++) {
        let newLayer = document.createElement('div')
        newLayer.id = `layer-${i}`
        newLayer.className = 'layer'
        nodeElements[i] = []

        for (j = 0; j < nodes[i]; j++) {
            let newNode = document.createElement('div')
            newNode.id = `node-${i}-${j}`
            newNode.className = 'node'
            newLayer.appendChild(newNode);
            nodeElements[i].push(newNode);
        }

        neuralNetContainer.appendChild(newLayer)
    }

    drawConnections(nodeElements)
}

const drawConnections = (nodes) => {
    const connections = document.getElementById('connections')
    const connRect = connections.getBoundingClientRect()
    const connX = connRect.x;
    const connY = connRect.y;

    connections.innerHTML = ''
    for (let layer = 0; layer < nodes.length; layer++) {
        if (layer == nodes.length - 1) {
            break;
        }

        let currentLayer = nodes[layer]
        let nextLayer = nodes[layer + 1]

        currentLayer.forEach(current => {
            const currentRect = current.getBoundingClientRect()
            const currentX = (currentRect.x - connX) + currentRect.width / 2;
            const currentY = (currentRect.y - connY) + currentRect.height / 2;

            nextLayer.forEach(next => {
                const nextRect = next.getBoundingClientRect()
                const nextX = (nextRect.x - connX) + nextRect.width / 2;
                const nextY = (nextRect.y - connY) + nextRect.height / 2;

                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
                line.setAttribute('x1', currentX)
                line.setAttribute('y1', currentY)
                line.setAttribute('x2', nextX)
                line.setAttribute('y2', nextY)
                line.toggleAttribute('off', true)
                line.classList.add('connection')
                connections.appendChild(line);
            })
        });
    }

    const lines = [...connections.childNodes]
    nodes = nodes.flat()
    animateConnections(lines, nodes);
    setInterval(() => animateConnections(lines, nodes), 1000)
}

const animateConnections = (lines, nodes) => {
    for (var line of lines) {
        line.setAttribute('stroke-opacity', Math.round(Math.random()) - 0.5)
    }
    
    for (var node of nodes) {
        node.style.opacity = Math.round(Math.random()) + 0.3
    }
}

window.addEventListener('load', initializeNeuralNet)
window.addEventListener('resize', debounce(initializeNeuralNet))
