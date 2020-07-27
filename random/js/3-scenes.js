let sceneIndex = 0;
let currentScene;

const guessArray = (scene, mode) => {
    let n = scene.randomNumber;
    let upper = scene.upper;
    let range = scene.range;
    console.log(`Number: ${n}, Upper: ${upper}, Range: ${range}`);
    if ( mode === "all" ) {
        let array = [];
        for ( let i = 0; i < upper; i ++ ) {
            array.push( i + 1 );
        }
        return array;
    } 
    if ( mode === "range" ) {
        let array = [n];
        let i = 1;
        do {
            //Upper/lower limits reached
            if ( !(n+i <= upper) ) {
                array.unshift(n-i);
                console.log(`Limits unshift: ${n-i}`);
            }
            if ( !(n-i > 0) ) {
                array.push(n+i);
                console.log(`Limits push: ${n+i}`);
            }

            //Normal Behavior
            if ( n + i <= upper && n-i > 0 ) {
                array.push(n+i);
                console.log(`Normal push: ${n+i}`);
            }
            if ( n - i > 0 && n+i <= upper && array.length < range ) {
                array.unshift(n-i);
                console.log(`Normal unshift: ${n-i}`);
            }
            i += 1;
        } while ( array.length < range )
        console.log(array);
        return array;
    }  
}

const gridArray = (scene) => { //rewrite to build via the guesses array
    let range = scene.displayRef;
    let array = [];
    for ( let i = 0; i < range.length; i ++ ) {
        let div = document.createElement("div");
        div.innerHTML = range[i];
        div.classList.add(i, "not-guessed");
        array.push(div);
    }
    return array;
}

const getRandomNumber = (scene) => {
    let num = 0;
    num = Math.floor(Math.random() * scene.upper) + 1;
    return num;
}

function GameScene(type, name, activeWindow, upper, range, dialogue) {
    this.type = type;
    this.name = name;
    this.activeWindow = activeWindow;
    this.upper = upper;
    this.randomNumber = getRandomNumber(this);
    this.range = range;
    this.displayRef = guessArray(this, "range"); //range-based tracker
    this.possibleGuesses = guessArray(this, "all"); //all possible guesses
    this.gridRef = gridArray(this);
    this.attempts = 0;
    this.dialogue = dialogue;
}

function ConversationScene( type, name, activeWindow, events ) {
    this.type = type;
    this.name = name;
    this.activeWindow = activeWindow;
    this.events = events;
    this.eventIndex = 0;
}

const sceneData = [
    [
        "game", //type
        "game-start", //name
        "start", //activeWindow
        20, //upper
        20, //range
        {
            intro: `> Hi, there! Think you can beat me at a game? Let's see... Type below to guess a number between 1 and ${this.upper}!`,
            incorrect: `> Hm. That wasn't it, huh? Just keep guessing! What's another number between 1 and ${this.upper}?`,
            invalid: `> ...that doesn't look like a number between 1 and ${this.upper}... That's okay! Take a breather and then you're sure to get it!`,
            alreadyGuessed: `> Sorry... you already guessed that number. Try again!`,
            correct: `> You did it! The number was ${this.randomNumber} and it only took you ${this.attempts} tries and ${playerScore.time[sceneIndex + 1]} seconds to get it. Would you like to see how the computer did?`
        } //dialogue
    ],
    [
        "conversation", //type
        "RaNDOM-arrives", //name
        "start", //activeWindow
        [
            {
                type: "flicker, scatter, burst, dialogue, pause, reset, cutscene",
                dialogue: {
                    text: [
                        "struct group_info init_groups = { .usage = ATOMIC_INIT(2) }; ",
                        "",
                        "struct group_info *groups_alloc(int gidsetsize){",
                        "",
                        "\tstruct group_info *group_info;",
                        "",
                        "\tint nblocks;",
                        "",
                        "\tint i;",
                        "",
                        "",
                        "",
                        "\tnblocks = (gidsetsize + NGROUPS_PER_BLOCK - 1) / NGROUPS_PER_BLOCK;",
                        "",
                        "\t/* Make sure we always allocate at least one indirect block pointer */",
                        "",
                        "\tnblocks = nblocks ? : 1;",
                        "",
                        "\tgroup_info = kmalloc(sizeof(*group_info) + nblocks*sizeof(gid_t *), GFP_USER);",
                        "",
                        "\tif (!group_info)",
                        "",
                        "\t\treturn NULL;",
                        "",
                        "\tgroup_info->ngroups = gidsetsize;",
                        "",
                        "\tgroup_info->nblocks = nblocks;",
                        "",
                        "\tatomic_set(&group_info->usage, 1);",
                        "",
                        "",
                        "",
                        "\tif (gidsetsize <= NGROUPS_SMALL)",
                        "",
                        "\t\tgroup_info->blocks[0] = group_info->small_block;",
                        "",
                        "\telse {",
                        "",
                        "\t\tfor (i = 0; i < nblocks; i++) {",
                        "",
                        "\t\t\tgid_t *b;",
                        "",
                        "\t\t\tb = (void *)__get_free_page(GFP_USER);",
                        "",
                        "\t\t\tif (!b)",
                        "",
                        "\t\t\t\tgoto out_undo_partial_alloc;",
                        "",
                        "\t\t\tgroup_info->blocks[i] = b;",
                        "",
                        "\t\t}",
                        "",
                        "\t}",
                        "",
                        "\treturn group_info;",
                        "",
                        "",
                        "",
                        "out_undo_partial_alloc:",
                        "",
                        "\twhile (--i >= 0) {",
                        "",
                        "\t\tfree_page((unsigned long)group_info->blocks[i]);",
                        "",
                        "\t}",
                        "",
                        "\tkfree(group_info);",
                        "",
                        "\treturn NULL;",
                        "",
                        "}",
                        "",
                        "",
                        "",
                        "EXPORT_SYMBOL(groups_alloc);",
                        "",
                        "",
                        "",
                        "void groups_free(struct group_info *group_info)",
                        "",
                        "{",
                        "",
                        "\tif (group_info->blocks[0] != group_info->small_block) {",
                        "",
                        "\t\tint i;",
                        "",
                        "\t\tfor (i = 0; i < group_info->nblocks; i++)",
                        "",
                        "\t\t\tfree_page((unsigned long)group_info->blocks[i]);",
                        "",
                        "\t}",
                        "",
                        "\tkfree(group_info);",
                        "",
                        "}",
                        "",
                        "",
                        "",
                        "EXPORT_SYMBOL(groups_free);",
                        "",
                        "",
                        "",
                        "/* export the group_info to a user-space array */",
                        "",
                        "static int groups_to_user(gid_t __user *grouplist,",
                        "",
                        "\t\t\t  const struct group_info *group_info)",
                        "",
                        "{",
                        "",
                        "\tint i;",
                        "",
                        "\tunsigned int count = group_info->ngroups;",
                        "",
                        "",
                        "",
                        "\tfor (i = 0; i < group_info->nblocks; i++) {",
                        "",
                        "\t\tunsigned int cp_count = min(NGROUPS_PER_BLOCK, count);",
                        "",
                        "\t\tunsigned int len = cp_count * sizeof(*grouplist);",
                        "",
                        "",
                        "",
                        "\t\tif (copy_to_user(grouplist, group_info->blocks[i], len))",
                        "",
                        "\t\t\treturn -EFAULT;",
                        "",
                        "",
                        "",
                        "\t\tgrouplist += NGROUPS_PER_BLOCK;",
                        "",
                        "\t\tcount -= cp_count;",
                        "",
                        "\t}",
                        "",
                        "\treturn 0;",
                        "",
                        "}",
                        "",
                        "",
                        "",
                        "/* fill a group_info from a user-space array - it must be allocated already */",
                        "",
                        "static int groups_from_user(struct group_info *group_info,",
                        "",
                        "    gid_t __user *grouplist)",
                        "",
                        "{",
                        "",
                        "\tint i;",
                        "",
                        "\tunsigned int count = group_info->ngroups;",
                        "",
                        "",
                        "",
                        "\tfor (i = 0; i < group_info->nblocks; i++) {",
                        "",
                        "\t\tunsigned int cp_count = min(NGROUPS_PER_BLOCK, count);",
                        "",
                        "\t\tunsigned int len = cp_count * sizeof(*grouplist);",
                        "",
                        "",
                        "",
                        "\t\tif (copy_from_user(group_info->blocks[i], grouplist, len))",
                        "",
                        "\t\t\treturn -EFAULT;",
                        "",
                        "",
                        "",
                        "\t\tgrouplist += NGROUPS_PER_BLOCK;",
                        "",
                        "\t\tcount -= cp_count;",
                        "",
                        "\t}",
                        "",
                        "\treturn 0;",
                        "",
                        "}",
                        "",
                        "",
                        "",
                        "/* a simple Shell sort */",
                        "",
                        "static void groups_sort(struct group_info *group_info)",
                        "",
                        "{",
                        "",
                        "\tint base, max, stride;",
                        "",
                        "\tint gidsetsize = group_info->ngroups;",
                        "",
                        "",
                        "",
                        "\tfor (stride = 1; stride < gidsetsize; stride = 3 * stride + 1)",
                        "",
                        "\t\t; /* nothing */",
                        "",
                        "\tstride /= 3;",
                        "",
                        "",
                        "",
                        "\twhile (stride) {",
                        "",
                        "\t\tmax = gidsetsize - stride;",
                        "",
                        "\t\tfor (base = 0; base < max; base++) {",
                        "",
                        "\t\t\tint left = base;",
                        "",
                        "\t\t\tint right = left + stride;",
                        "",
                        "\t\t\tgid_t tmp = GROUP_AT(group_info, right);",
                        "",
                        "",
                        "",
                        "\t\t\twhile (left >= 0 && GROUP_AT(group_info, left) > tmp) {",
                        "",
                        "\t\t\t\tGROUP_AT(group_info, right) =",
                        "",
                        "\t\t\t\t    GROUP_AT(group_info, left);",
                        "",
                        "\t\t\t\tright = left;",
                        "",
                        "\t\t\t\tleft -= stride;",
                        "",
                        "\t\t\t}",
                        "",
                        "\t\t\tGROUP_AT(group_info, right) = tmp;",
                        "",
                        "\t\t}",
                        "",
                        "\t\tstride /= 3;",
                        "",
                        "\t}",
                        "",
                        "}",
                        "",
                        "",
                        "",
                        "/* a simple bsearch */",
                        "",
                        "int groups_search(const struct group_info *group_info, gid_t grp)",
                        "",
                        "{",
                        "",
                        "\tunsigned int left, right;",
                        "",
                        "",
                        "",
                        "\tif (!group_info)",
                        "",
                        "\t\treturn 0;",
                        "",
                        "",
                        "",
                        "\tleft = 0;",
                        "",
                        "\tright = group_info->ngroups;",
                        "",
                        "\twhile (left < right) {",
                        "",
                        "\t\tunsigned int mid = left + (right - left)/2;",
                        "",
                        "\t\tif (grp > GROUP_AT(group_info, mid))",
                        "",
                        "\t\t\tleft = mid + 1;",
                        "",
                        "\t\telse if (grp < GROUP_AT(group_info, mid))",
                        "",
                        "\t\t\tright = mid;",
                        "",
                        "\t\telse",
                        "",
                        "\t\t\treturn 1;",
                        "",
                        "\t}",
                        "",
                        "\treturn 0;",
                        "",
                        "}",
                        "",
                        "",
                        "",
                        "/**",
                        "",
                        " * set_groups - Change a group subscription in a set of credentials",
                        "",
                        " * @new: The newly prepared set of credentials to alter",
                        "",
                        " * @group_info: The group list to install",
                        "",
                        " *",
                        "",
                        " * Validate a group subscription and, if valid, insert it into a set",
                        "",
                        " * of credentials.",
                        "",
                        " */",
                        "",
                        "int set_groups(struct cred *new, struct group_info *group_info)",
                        "",
                        "{",
                        "",
                        "\tput_group_info(new->group_info);",
                        "",
                        "\tgroups_sort(group_info);",
                        "",
                        "\tget_group_info(group_info);",
                        "",
                        "\tnew->group_info = group_info;",
                        "",
                        "\treturn 0;",
                        "",
                        "}",
                        "",
                        "",
                        "",
                        "EXPORT_SYMBOL(set_groups);",
                        "",
                        "",
                        "",
                        "/**",
                        "",
                        " * set_current_groups - Change current's group subscription",
                        "",
                        " * @group_info: The group list to impose",
                        "",
                        " *",
                        "",
                        " * Validate a group subscription and, if valid, impose it upon current's task",
                        "",
                        " * security record.",
                        "",
                        " */",
                        "",
                        "int set_current_groups(struct group_info *group_info)",
                        "",
                        "{",
                        "",
                        "\tstruct cred *new;",
                        "",
                        "\tint ret;",
                        "",
                        "",
                        "",
                        "\tnew = prepare_creds();",
                        "",
                        "\tif (!new)",
                        "",
                        "\t\treturn -ENOMEM;",
                        "",
                        "",
                        "",
                        "\tret = set_groups(new, group_info);",
                        "",
                        "\tif (ret < 0) {",
                        "",
                        "\t\tabort_creds(new);",
                        "",
                        "\t\treturn ret;",
                        "",
                        "\t}",
                        "",
                        "",
                        "",
                        "\treturn commit_creds(new);",
                        "",
                        "}",
                        "",
                        "",
                        "",
                        "EXPORT_SYMBOL(set_current_groups)"
                    ],
                    ref: "printLine"
                },
                iterations: undefined,
                arguments: undefined
            }
        ] //events
    ]
]

const gameInit = () => {
    let scenes = [];
    for ( i = 0; i < sceneData.length; i ++ ) {
        let type = sceneData[i][0];
        if ( type == "game" ) {
            scenes[i] = new GameScene(...sceneData[i]);
        }
        if ( type == "conversation" ) {
            scenes[i] = new ConversationScene(...sceneData[i]);
        }
        if ( type == "cutscene" ) {
    
        }
    }
    console.info("Game initialized!");
    return scenes;
}

const scenes = gameInit();