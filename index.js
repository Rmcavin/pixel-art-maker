window.onload = () => {

  let config = {
    //board.style
    board: {
      margin: 'auto',
      marginTop: '20px',
      padding: '20px',
      width: '900px',
      height: '400px',
      borderRadius: '3px',
      backgroundColor: 'lightgrey',
      boxShadow: '3px 3px 3px grey',
    },
    toolBar: {
      margin : 'auto',
      marginTop: '20px',
      padding: '20px',
      width: '900px',
      height: '60px',
      borderRadius: '3px',
      backgroundColor: 'lightgrey',
      boxShadow: '3px 3px 3px grey',
    },
    square: {
      width: '8px',
      height: '8px',
      border: '1px solid lightgrey',
      backgroundColor: 'white',
      float: 'left',
    },
    palette: {
      margin: 'auto',
      display: 'flex',
      justifyContent: 'center',
    },
    button: {
      borderRadius: '100%',
      height: '30px',
      width: '30px',
    },
    colorForm: {
      height: 'auto',
      width: '300px',
      margin: 'auto',
      marginTop: '10px',
      textAlign: 'center'
    },
    colors:
      ['pink', 'darkred', 'red', 'darkorange', 'orange',
        'goldenrod', 'yellow', 'yellowgreen', 'darkgreen', 'green', 'midnightblue', 'blue',
      'indigo', 'purple', 'violet', 'black', 'white', 'sienna', 'wheat'],
    currentPaintColor: null,
    toggleMouse: false,
  }

  //Make each square
  function makeSquare(index) {
    //Make the square
    let square = document.createElement('div');
    //Add an id
    square.setAttribute('id', index)

    square.addEventListener('mouseenter', function() {
      if (config.toggleMouse) {
        square.style.backgroundColor = config.currentPaintColor;
      }
    })
    //Style the squares
    addCSS(config,square,"square")
    //Add to the board
    board.append(square);
  }

  //Create toolbar components
  function buildPalette() {
    let palette = document.createElement('div');
    addCSS(config,palette,'palette')
    toolBar.append(palette);
    //iterate through the colors
    for (color of config.colors) {
      let button = document.createElement('button');
      button.setAttribute('id', color);
      button.onfocus = button.style.outline = 'none';
      //button.onfocus = button.style.border = '2px dashed white'

      button.addEventListener('click', function() {
        config.currentPaintColor = this.id;
      })
      addCSS(config,button,"button",color)
      palette.append(button)
    }
    let colorForm = document.createElement('form');
    let colorLabel = document.createElement('label')
    colorLabel.innerHTML = "custom color: "
    let colorInput = document.createElement('input');
    colorInput.setAttribute('type', 'color');
    addCSS(config,colorForm,"colorForm");
    colorInput.onfocus = colorInput.style.outline = 'none';
    colorInput.addEventListener('change', function() {
      config.currentPaintColor = colorInput.value;
    })
    toolBar.append(colorForm);
    colorForm.append(colorLabel);
    colorForm.append(colorInput);
  }

  //Access the body element
  let body = document.getElementsByTagName('body')[0]

  //Create the board element
  let board = document.createElement('div')

  //Create and style the tool board
  let toolBar = document.createElement('div')

  //Style the board
  addCSS(config,board,"board");
  //Style the toolBar
  addCSS(config,toolBar,"toolBar");

  //Add the board and toolBar to the body
  body.append(board)
  body.append(toolBar)

  //Create toolbar components
  buildPalette();

  //Make all the squares
  for (var i = 0; i < 3600; i++) {
    makeSquare(i);
  }

  window.addEventListener('mousedown', function() {
    config.toggleMouse = true;
  })
  window.addEventListener('mouseup', function() {
    config.toggleMouse = false;
  })
}

function addCSS(options,element,objname,color){
  let styles = options[objname];
  let style = element.style;
  Object.assign(style, styles);
  if (color) {
    element.style.backgroundColor = color
  }
}
