
const getTreeData = () => {
  var blocks = document.querySelectorAll(".block");
    return {element: Number(blocks[0].childNodes[0].innerHTML),
      left: {
        element: Number(blocks[1].childNodes[0].innerHTML),
        left: {
          element: Number(blocks[3].childNodes[0].innerHTML),
          left:{
            element: Number(blocks[7].childNodes[0].innerHTML),
            left:{element: Number(blocks[15].childNodes[0].innerHTML),},
            right:{element: Number(blocks[16].childNodes[0].innerHTML)},
          },
          right:{
            element: Number(blocks[8].childNodes[0].innerHTML),
            left:{element: Number(blocks[17].childNodes[0].innerHTML),},
            right:{element: Number(blocks[18].childNodes[0].innerHTML)},
          },
        },
        right: {
          element: Number(blocks[4].childNodes[0].innerHTML),
          left:{
            element: Number(blocks[9].childNodes[0].innerHTML),
            left:{element: Number(blocks[19].childNodes[0].innerHTML),},
          },
          right:{element: Number(blocks[10].childNodes[0].innerHTML)},
        },
      },
      right: {
        element: Number(blocks[2].childNodes[0].innerHTML),
        left: {
          element: Number(blocks[5].childNodes[0].innerHTML),
          left:{element: Number(blocks[11].childNodes[0].innerHTML),},
          right:{element: Number(blocks[12].childNodes[0].innerHTML)},
        },
        right: {
          element: Number(blocks[6].childNodes[0].innerHTML),
          left:{element: Number(blocks[13].childNodes[0].innerHTML),},
          right:{element: Number(blocks[14].childNodes[0].innerHTML)},
        },
      },
    };
  };
  
  const renderBinaryTree = (node) => {
    const { left, right, element } = node;
    return `
      <div class="nodeElement">${element}</div>
      ${
        left || right
          ? `
            <div class="nodeBottomLine"></div>
            <div class="nodeChildren">
              ${
                left
                  ? `
                  <div class="node nodeLeft">
                    ${renderBinaryTree(left)}
                  </div>
                  `
                  : ''
              }
              ${
                right
                  ? `
                  <div class="node nodeRight">
                    ${renderBinaryTree(right)}
                  </div>
                  `
                  : ''
              }
            </div>
          `
          : ''
      }
    `;
  };
  
  const main = () => {
    const rootNode = getTreeData();
    const treeDOMElement = document.querySelector('.tree');
    treeDOMElement.innerHTML = renderBinaryTree(rootNode);
  };
  
  main();