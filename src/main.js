import './style.css'
import Phaser from './lib/phaser.js';

const sizes={
  width:868,
  height:625
}

var constant=0

class SceneA extends Phaser.Scene{
constructor() {
  super({ key: 'sceneA' });
}

preload(){
  this.load.image("bg","./assets/bg.png")
  this.load.image("window","./assets/window.png")
  this.load.image("chair","./assets/chair.png")
  this.load.image("kittybed","./assets/kittybed.png")
  this.load.image("books","./assets/books.png")
  this.load.image("books2","./assets/books2.png")
  this.load.image("pc","./assets/pc.png")
  this.load.image("pc2","./assets/pc2.png")
  this.load.image("tabl","./assets/tabl.png")
  this.load.image("kitty","./assets/kitty.png")
  this.load.image("kitty2","./assets/kitty2.png")
  this.load.image("flower","./assets/flower.png")
  this.load.image("cursor","./assets/cursor.png")
  this.load.image("window2","./assets/window2.png")
  this.load.image("bgframe","./assets/bgframe.png")
  this.load.image("bgframe2","./assets/bgframe2.png")
  this.load.audio('bgmusic', "./music/freddy.mp3")
}

create() {
  if (constant == 0) {
    this.bgmusic = this.sound.add('bgmusic', {volume: 0.1});
    this.bgmusic.loop = true;
    this.bgmusic.play();
    constant+=1
  }

  this.add.image(0, 0, "bg").setOrigin(0, 0);
  const windowImage = this.add.image(480, 25, "window").setOrigin(0, 0).setInteractive();
  windowImage.on('pointerdown', () => this.windowClick());
  windowImage.on('pointerover', () => this.windowHover());
  windowImage.on('pointerout', () => this.windowRest());

  const booksImage = this.add.image(560, 280, "books").setOrigin(0, 0).setInteractive();
  booksImage.on('pointerdown', () => this.booksClick());
  booksImage.on('pointerover', () => this.booksHover());
  booksImage.on('pointerout', () => this.booksRest());

  this.add.image(0, 0, "kittybed").setOrigin(0, 0);

  this.add.image(0, 0, "tabl").setOrigin(0, 0);

  const kittyImage = this.add.image(350, 380, "kitty").setOrigin(0, 0).setInteractive();
  kittyImage.on('pointerdown', () => this.kittyClick());
  kittyImage.on('pointerover', () => this.kittyHover());
  kittyImage.on('pointerout', () => this.kittyRest());

  this.add.image(0, 0, "flower").setOrigin(0, 0);

  const pcImage = this.add.image(70, 65, "pc").setOrigin(0, 0).setInteractive();
  pcImage.on('pointerdown', () => this.pcClick());
  pcImage.on('pointerover', () => this.pcHover());
  pcImage.on('pointerout', () => this.pcRest());

  const frameImage = this.add.image(330, 70, "bgframe").setOrigin(0, 0).setInteractive();
  frameImage.on('pointerdown', () => this.frameClick());
  frameImage.on('pointerover', () => this.frameHover());
  frameImage.on('pointerout', () => this.frameRest());
  
  this.add.image(0, 0, "chair").setOrigin(0, 0);

  this.windowClick = function() {
    this.bgmusic.stop()
      this.scene.start('sceneB')
  };

  this.windowHover = function() {
      windowImage.setTexture('window2')
  };

  this.windowRest = function() {
      windowImage.setTexture('window')
  };

  this.booksClick = function() {
    // this.bgmusic.stop()
    this.scene.start('sceneC')
  };

  this.booksHover = function() {
    booksImage.setTexture('books2')
  };

  this.booksRest = function() {
    booksImage.setTexture('books')
  };

  this.kittyClick = function() {
    this.bgmusic.stop()
    this.scene.start('sceneD')
  };

  this.kittyHover = function() {
    kittyImage.setTexture('kitty2')
  };

  this.kittyRest = function() {
    kittyImage.setTexture('kitty')
  };

  this.pcClick = function() {
    this.scene.start('sceneE')
  };

  this.pcHover = function() {
    pcImage.setTexture('pc2')
  };

  this.pcRest = function() {
    pcImage.setTexture('pc')
  };

  this.frameClick = function() {
    this.scene.start('framescene')
  };

  this.frameHover = function() {
    frameImage.setTexture('bgframe2')
  };

  this.frameRest = function() {
    frameImage.setTexture('bgframe')
  };



  const cursor = this.physics.add.image(500, 500, "cursor");
  cursor.setDirectControl();
  cursor.setImmovable();
  cursor.setOrigin(0.5, 0.5);

  this.input.on('pointermove', pointer => {
      cursor.setPosition(pointer.worldX, pointer.worldY);
  });

  this.input.setDefaultCursor('none');
}

  update(){

  }
}

class FrameScene extends Phaser.Scene {

  timedEvent;

  constructor() {
    super({
      key:'framescene'
    })
  }

  preload(){
    this.load.image('picture', './assets/photoframe.png')
    this.load.image('framereaction', './assets/framereaction.png')
    this.load.audio('sparkle', './music/sparkle.mp3')
    this.load.audio('wow', './music/wow.mp3')
  }

  create() {
    this.effect = this.sound.add('sparkle', {volume: 0.1});
    this.effect.play();
    this.add.image(0, 0, "picture").setOrigin(0, 0);
    this.timedEvent = this.time.delayedCall(3000, this.onEvent, [], this);
  }

  onEvent() {
    this.add.image(0, 0, "framereaction").setOrigin(0, 0);
    this.effect = this.sound.add('wow', {volume: 0.75});
    this.effect.play();
    this.timedEvent = this.time.delayedCall(2500, this.onEvent1, [], this);
  }

  onEvent1() {
    this.scene.start('sceneA')
  }
}

class SceneB extends Phaser.Scene {

  timedEvent;

  constructor() {
    super({
      key:'sceneB'
    })
  }

  preload() {
    this.load.image('windowbg', './assets/windowscene.png')
    this.load.image('windowbg2', './assets/windowscene2.png')
    this.load.image('windowbg3', './assets/windowscene3.png')
    this.load.image('windowbg4', './assets/windowscene4.png')
    this.load.image('reaction', './assets/windowreaction.png')
    this.load.audio('effect', "./music/effect.mp3")
  }

  create() {
    this.effect = this.sound.add('effect', {volume: 0.1});
    this.effect.play();

    this.add.image(0, 0, "windowbg").setOrigin(0, 0);
    this.timedEvent = this.time.delayedCall(500, this.onEvent, [], this);
  }

  update() {
  }

  onEvent(){
    this.add.image(0, 0, "windowbg2").setOrigin(0, 0);
    this.timedEvent = this.time.delayedCall(500, this.onEvent2, [], this);
  }

  onEvent2(){
    this.add.image(0, 0, "windowbg3").setOrigin(0, 0);
    this.timedEvent = this.time.delayedCall(500, this.onEvent3, [], this);
  }

  onEvent3(){
    this.add.image(0, 0, "windowbg4").setOrigin(0, 0);
    this.timedEvent = this.time.delayedCall(1500, this.onEvent4, [], this);
  }

  onEvent4(){
    this.add.image(0, 0, "reaction").setOrigin(0, 0);
    this.timedEvent = this.time.delayedCall(2000, this.onEvent5, [], this);
  }

  onEvent5(){
    constant = 0
    this.scene.start('sceneA')
  }
}

class SceneC extends Phaser.Scene{
  timedEvent

  constructor() {
    super({
      key: 'sceneC'
    })
  }

  preload() {
    this.load.image('booksscene', './assets/booksscene.png')
    this.load.image('booksreaction', './assets/bookreaction.png')
    this.load.audio('meow', "./music/meow.wav")
  }

  create() {
    this.add.image(0, 0, "booksscene").setOrigin(0, 0);
    this.timedEvent = this.time.delayedCall(4000, this.onEvent, [], this);
  }

  update() {
  }

  onEvent(){
    this.effect = this.sound.add('meow', {volume: 0.1});
    this.effect.play();
    this.add.image(0, 0, "booksreaction").setOrigin(0, 0);
    this.timedEvent = this.time.delayedCall(3500, this.onEvent2, [], this);
  }

  onEvent2() {
    this.scene.start('sceneA')
  }
}

class SceneD extends Phaser.Scene{
  timedEvent

  constructor() {
    super({
      key: 'sceneD'
    })
  }

  preload() {
    this.load.image('kittyreaction', './assets/kittyreaction.png')
  }

  create() {
    this.add.image(0, 0, "kittyreaction").setOrigin(0, 0);
    this.timedEvent = this.time.delayedCall(2000, this.onEvent, [], this);
  }

  update() {
  }

  onEvent(){
    constant = 0
    this.scene.start('sceneA')
  }
}

class SceneE extends Phaser.Scene{
  timedEvent

  constructor() {
    super({
      key: 'sceneE'
    })
  }

  preload() {
    this.load.image('pcscene', './assets/pcscene1.png')
    this.load.image('pcscene2', './assets/pcscene2.png')
    this.load.image('pcscene3', './assets/pcscene3.png')
  }

  create() {
    this.add.image(0, 0, "pcscene").setOrigin(0, 0);
    this.timedEvent = this.time.delayedCall(1500, this.onEvent, [], this);
  }

  onEvent() {
    this.scene.start('sceneF')
  }
}

class SceneF extends Phaser.Scene{
  timedEvent

  constructor() {
    super({
      key: 'sceneF'
    })
  }

  preload() {
    this.load.image('homepage', './assets/homescreen.png')
    this.load.image('notesfolder', './assets/notesfolder.png')
    this.load.image('fotoz', './assets/fotofolder.png')
    this.load.image('notes', './assets/notes.png')
    this.load.image('pccursor', './assets/pccursor.png')
    this.load.image('logout', './assets/logout.png')
    this.load.image('logoutscene', './assets/logoutscene.png')
  }

  create() {
    this.add.image(0, 0, "homepage").setOrigin(0, 0);
    
    const notesFolder = this.add.image(150, 120, "notesfolder").setOrigin(0, 0).setInteractive();
    notesFolder.on('pointerdown', () => this.notesFolderClick());

    const fotoFolder = this.add.image(150, 250, "fotoz").setOrigin(0, 0).setInteractive();
    fotoFolder.on('pointerdown', () => this.fotoFolderClick());

    const notes = this.add.image(400, 250, "notes").setOrigin(0, 0).setInteractive();
    notes.on('pointerdown', () => this.notesClick());

    const logout = this.add.image(230, 470, "logout").setOrigin(0, 0).setInteractive();
    logout.on('pointerdown', () => this.logoutClick());

    this.notesFolderClick = function() {
      this.scene.start('sceneG')
    }

    this.logoutClick = function() {
      this.add.image(0,0,'logoutscene').setOrigin(0,0)
      this.timedEvent = this.time.delayedCall(2500, this.afterClick, [], this);
    }

    this.afterClick = function() {
      this.scene.start('sceneA')
    };

    this.notesClick = function() {
      this.scene.start('scenenote')
    }
    
    this.fotoFolderClick = function() {
      this.scene.start('sceneH')
    }

    const cursor = this.physics.add.image(0, 0, "pccursor");
    cursor.setDirectControl();
    cursor.setImmovable();
    cursor.setOrigin(0.5, 0.5);

    this.input.on('pointermove', pointer => {
        cursor.setPosition(pointer.worldX, pointer.worldY);
    });

    this.input.setDefaultCursor('none');
  }

  update() {
  }

}

class SceneNote extends Phaser.Scene{
  timedEvent

  constructor() {
    super({
      key: 'scenenote'
    })
  }

  preload() {
    this.load.image('bdaynote', './assets/birthdaynote.png')
    this.load.image('fullbg', './assets/fullpcbg.png')
    this.load.image('exitbutton', './assets/exitbutton.png')
  }

  create() {
    this.add.image(0,0,'fullbg').setOrigin(0,0)
    this.add.image(0,0,'bdaynote').setOrigin(0,0)
    this.load.image('pccursor', './assets/pccursor.png')

    const exitbutton = this.add.image(600, 100, "exitbutton").setOrigin(0, 0).setInteractive();
    exitbutton.on('pointerdown', () => this.exitClick());

    this.exitClick = function() {
      this.scene.start('sceneF')
    }

    const cursor = this.physics.add.image(0, 0, "pccursor");
    cursor.setDirectControl();
    cursor.setImmovable();
    cursor.setOrigin(0.5, 0.5);

    this.input.on('pointermove', pointer => {
        cursor.setPosition(pointer.worldX, pointer.worldY);
    });

    this.input.setDefaultCursor('none');
  }
}

class SceneG extends Phaser.Scene{
  timedEvent

  constructor() {
    super({
      key: 'sceneG'
    })
  }

  preload() {
    this.load.image('fullbg', './assets/fullpcbg.png')
    this.load.image('notespopup', './assets/notesfolderpopup.png')
    this.load.image('pccursor', './assets/pccursor.png')
    this.load.image('exitbutton', './assets/exitbutton.png')
    this.load.image('notesicon', './assets/notesicon.png')
  }

  create() {
    this.add.image(0,0,'fullbg').setOrigin(0,0)
    this.add.image(0,0,'notespopup').setOrigin(0,0)

    const exitbutton = this.add.image(590, 180, "exitbutton").setOrigin(0, 0).setInteractive();
    exitbutton.on('pointerdown', () => this.exitClick());

    const notesicon1 = this.add.image(240, 230, "notesicon").setOrigin(0, 0).setInteractive();
    notesicon1.on('pointerdown', () => this.note1Click());

    const notesicon2 = this.add.image(330, 230, "notesicon").setOrigin(0, 0).setInteractive();
    notesicon2.on('pointerdown', () => this.note2Click());

    const notesicon3 = this.add.image(420, 230, "notesicon").setOrigin(0, 0).setInteractive();
    notesicon3.on('pointerdown', () => this.note3Click());

    const notesicon4 = this.add.image(520, 230, "notesicon").setOrigin(0, 0).setInteractive();
    notesicon4.on('pointerdown', () => this.note4Click());

    const notesicon5 = this.add.image(240, 330, "notesicon").setOrigin(0, 0).setInteractive();
    notesicon5.on('pointerdown', () => this.note5Click());

    const notesicon6 = this.add.image(330, 330, "notesicon").setOrigin(0, 0).setInteractive();
    notesicon6.on('pointerdown', () => this.note6Click());

    const notesicon7 = this.add.image(420, 330, "notesicon").setOrigin(0, 0).setInteractive();
    notesicon7.on('pointerdown', () => this.note7Click());

    const notesicon8 = this.add.image(520, 330, "notesicon").setOrigin(0, 0).setInteractive();
    notesicon8.on('pointerdown', () => this.note8Click());

    const cursor = this.physics.add.image(0, 0, "pccursor");
    cursor.setDirectControl();
    cursor.setImmovable();
    cursor.setOrigin(0.5, 0.5);

    this.input.on('pointermove', pointer => {
        cursor.setPosition(pointer.worldX, pointer.worldY);
    });

    this.input.setDefaultCursor('none');

    this.exitClick = function() {
      this.scene.start('sceneF')
    }

    this.note1Click = function() {
      this.scene.start('note1scene')
    }

    this.note2Click = function() {
      this.scene.start('note2scene')
    }

    this.note3Click = function() {
      this.scene.start('note3scene')
    }

    this.note4Click = function() {
      this.scene.start('note4scene')
    }

    this.note5Click = function() {
      this.scene.start('note5scene')
    }

    this.note6Click = function() {
      this.scene.start('note6scene')
    }

    this.note7Click = function() {
      this.scene.start('note7scene')
    }

    this.note8Click = function() {
      this.scene.start('note8scene')
    }
  }
}

class Note1Scene extends Phaser.Scene{
  timedEvent

  constructor() {
    super({
      key: 'note1scene'
    })
  }

  preload() {
    this.load.image('notes1','./assets/note1.png')
    this.load.image('pccursor','./assets/pccursor.png')
    this.load.image('exitbutton','./assets/exitbutton.png')
  }

  create() {
    this.add.image(0, 0, "notes1").setOrigin(0, 0)
    const exitbutton = this.add.image(500,170,'exitbutton').setOrigin(0,0).setInteractive();
    exitbutton.on('pointerdown', () => this.exitClick());

    this.exitClick = function() {
      this.scene.start('sceneG')
    }

    const cursor = this.physics.add.image(0, 0, "pccursor");
    cursor.setDirectControl();
    cursor.setImmovable();
    cursor.setOrigin(0.5, 0.5);

    this.input.on('pointermove', pointer => {
        cursor.setPosition(pointer.worldX, pointer.worldY);
    });

    this.input.setDefaultCursor('none');
  }
}

class Note2Scene extends Phaser.Scene{
  timedEvent

  constructor() {
    super({
      key: 'note2scene'
    })
  }

  preload() {
    this.load.image('note2','./assets/note2.png')
    this.load.image('pccursor','./assets/pccursor.png')
    this.load.image('exitbutton','./assets/exitbutton.png')
  }

  create() {
    this.add.image(0, 0, "note2").setOrigin(0, 0)
    const exitbutton = this.add.image(500,170,'exitbutton').setOrigin(0,0).setInteractive();
    exitbutton.on('pointerdown', () => this.exitClick());

    this.exitClick = function() {
      this.scene.start('sceneG')
    }

    const cursor = this.physics.add.image(0, 0, "pccursor");
    cursor.setDirectControl();
    cursor.setImmovable();
    cursor.setOrigin(0.5, 0.5);

    this.input.on('pointermove', pointer => {
        cursor.setPosition(pointer.worldX, pointer.worldY);
    });

    this.input.setDefaultCursor('none');
  }
}

class Note3Scene extends Phaser.Scene{
  timedEvent

  constructor() {
    super({
      key: 'note3scene'
    })
  }

  preload() {
    this.load.image('note3','./assets/note3.png')
    this.load.image('pccursor','./assets/pccursor.png')
    this.load.image('exitbutton','./assets/exitbutton.png')
  }

  create() {
    this.add.image(0, 0, "note3").setOrigin(0, 0)
    const exitbutton =this.add.image(500,170,'exitbutton').setOrigin(0,0).setInteractive();
    exitbutton.on('pointerdown', () => this.exitClick());

    this.exitClick = function() {
      this.scene.start('sceneG')
    }
    
    const cursor = this.physics.add.image(0, 0, "pccursor");
    cursor.setDirectControl();
    cursor.setImmovable();
    cursor.setOrigin(0.5, 0.5);

    this.input.on('pointermove', pointer => {
        cursor.setPosition(pointer.worldX, pointer.worldY);
    });

    this.input.setDefaultCursor('none');
  }
}

class Note4Scene extends Phaser.Scene{
  timedEvent

  constructor() {
    super({
      key: 'note4scene'
    })
  }

  preload() {
    this.load.image('note4','./assets/note4.png')
    this.load.image('pccurson','./assets/pccursor.png')
    this.load.image('exitbutton','./assets/exitbutton.png')
  }

  create() {
    this.add.image(0, 0, "note4").setOrigin(0, 0)
    const exitbutton =this.add.image(500,170,'exitbutton').setOrigin(0,0).setInteractive();
    exitbutton.on('pointerdown', () => this.exitClick());

    this.exitClick = function() {
      this.scene.start('sceneG')
    }
    
    const cursor = this.physics.add.image(0, 0, "pccursor");
    cursor.setDirectControl();
    cursor.setImmovable();
    cursor.setOrigin(0.5, 0.5);

    this.input.on('pointermove', pointer => {
        cursor.setPosition(pointer.worldX, pointer.worldY);
    });

    this.input.setDefaultCursor('none');
  }
}

class Note5Scene extends Phaser.Scene{
  timedEvent

  constructor() {
    super({
      key: 'note5scene'
    })
  }

  preload() {
    this.load.image('note5','./assets/note5.png')
    this.load.image('exitbutton','./assets/exitbutton.png')
    this.load.image('pccursor','./assets/pccursor.png')
  }

  create() {
    this.add.image(0, 0, "note5").setOrigin(0, 0)
    const exitbutton =this.add.image(500,170,'exitbutton').setOrigin(0,0).setInteractive();
    exitbutton.on('pointerdown', () => this.exitClick());

    this.exitClick = function() {
      this.scene.start('sceneG')
    }

    const cursor = this.physics.add.image(0, 0, "pccursor");
    cursor.setDirectControl();
    cursor.setImmovable();
    cursor.setOrigin(0.5, 0.5);

    this.input.on('pointermove', pointer => {
        cursor.setPosition(pointer.worldX, pointer.worldY);
    });

    this.input.setDefaultCursor('none');
  }
}

class Note6Scene extends Phaser.Scene{
  timedEvent

  constructor() {
    super({
      key: 'note6scene'
    })
  }

  preload() {
    this.load.image('note6','./assets/note6.png')
    this.load.image('exitbutton','./assets/exitbutton.png')
    this.load.image('pcursor','./assets/pccursor.png')
  }

  create() {
    this.add.image(0, 0, "note6").setOrigin(0, 0)
    const exitbutton =this.add.image(500,170,'exitbutton').setOrigin(0,0).setInteractive();
    exitbutton.on('pointerdown', () => this.exitClick());

    this.exitClick = function() {
      this.scene.start('sceneG')
    }

    const cursor = this.physics.add.image(0, 0, "pccursor");
    cursor.setDirectControl();
    cursor.setImmovable();
    cursor.setOrigin(0.5, 0.5);

    this.input.on('pointermove', pointer => {
        cursor.setPosition(pointer.worldX, pointer.worldY);
    });

    this.input.setDefaultCursor('none');
  }
}

class Note7Scene extends Phaser.Scene{
  timedEvent

  constructor() {
    super({
      key: 'note7scene'
    })
  }

  preload() {
    this.load.image('note7','./assets/note7.png')
    this.load.image('pccursor','./assets/pccursor.png')
    this.load.image('exitbutton','./assets/exitbutton.png')
  }

  create() {
    this.add.image(0, 0, "note7").setOrigin(0, 0)
    const exitbutton =this.add.image(500,170,'exitbutton').setOrigin(0,0).setInteractive();
    exitbutton.on('pointerdown', () => this.exitClick());

    this.exitClick = function() {
      this.scene.start('sceneG')
    }

    const cursor = this.physics.add.image(0, 0, "pccursor");
    cursor.setDirectControl();
    cursor.setImmovable();
    cursor.setOrigin(0.5, 0.5);

    this.input.on('pointermove', pointer => {
        cursor.setPosition(pointer.worldX, pointer.worldY);
    });

    this.input.setDefaultCursor('none');
  }
}

class Note8Scene extends Phaser.Scene{
  timedEvent

  constructor() {
    super({
      key: 'note8scene'
    })
  }

  preload() {
    this.load.image('note8','./assets/note8.png')
    this.load.image('pccursor','./assets/pccursor.png')
    this.load.image('exitbutton','./assets/exitbutton.png')
  }

  create() {
    this.add.image(0, 0, "note8").setOrigin(0, 0)
    const exitbutton =this.add.image(500,170,'exitbutton').setOrigin(0,0).setInteractive();
    exitbutton.on('pointerdown', () => this.exitClick());

    this.exitClick = function() {
      this.scene.start('sceneG')
    }   
    
    const cursor = this.physics.add.image(0, 0, "pccursor");
    cursor.setDirectControl();
    cursor.setImmovable();
    cursor.setOrigin(0.5, 0.5);

    this.input.on('pointermove', pointer => {
        cursor.setPosition(pointer.worldX, pointer.worldY);
    });

    this.input.setDefaultCursor('none');
  }
}

class SceneH extends Phaser.Scene{
  timedEvent

  constructor() {
    super({
      key: 'sceneH'
    })
  }

  preload() {
    this.load.image('fullbg', './assets/fullpcbg.png')
    this.load.image('fotopopup', './assets/fotopopup.png')
    this.load.image('pccursor', './assets/pccursor.png')
    this.load.image('exitbutton', './assets/exitbutton.png')
    this.load.image('wip', './assets/fototext.png')
  }

  create() {
    this.add.image(0,0,'fullbg').setOrigin(0,0)
    this.add.image(0,0,'fotopopup').setOrigin(0,0)
    this.add.image(0,0,'wip').setOrigin(0,0)

    const exitbutton = this.add.image(590, 180, "exitbutton").setOrigin(0, 0).setInteractive();
    exitbutton.on('pointerdown', () => this.exitClick());

    this.exitClick = function() {
      this.scene.start('sceneF')
    }
    
    const cursor = this.physics.add.image(0, 0, "pccursor");
    cursor.setDirectControl();
    cursor.setImmovable();
    cursor.setOrigin(0.5, 0.5);

    this.input.on('pointermove', pointer => {
        cursor.setPosition(pointer.worldX, pointer.worldY);
    });

    this.input.setDefaultCursor('none');
  }
}

const config = {
  type:Phaser.WEBGL,
  width:sizes.width,
  height:sizes.height,
  canvas:gameCanvas,

  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 50 },
      debug: false
    }
  },

  scene: [ SceneA, SceneB, SceneC, SceneD, SceneE, SceneF, SceneG, SceneH, SceneNote, FrameScene, Note1Scene, Note2Scene, Note3Scene, Note4Scene, Note5Scene, Note6Scene, Note7Scene, Note8Scene ]
}


const game = new Phaser.Game(config)

