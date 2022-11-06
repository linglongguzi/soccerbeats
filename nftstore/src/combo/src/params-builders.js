 //const Web3 = require("web3");
//const Web3Utils = require("web3-utils");
//const web3 = new Web3();
const BN = require('bn.js');
//const BN = Web3Utils.BN;

/**
 * 
 * Usage:
 * 
 *  let mintParamsBuilder = new MintParamsBuilder();
 * 
 *  // use own 100x ERC1155 token [0], indicating no set id
 *  mintParamsBuilder.use('0x727cB81C955e1D....dfDFe07281', 0, 100, 0);      
 *    
 *  // use own ERC721 token [103], indicating set id 10000000
 *  mintParamsBuilder.use('0xF27B8D220249fb....A6a71914E2', 103, 1, 10000000);
 * 
 *  // buy 15x ERC1155(collection) token [932], indicating set ID 10000001
 *  mintParamsBuilder.buy('0x10c01D6B0396D9....F60b9cB1F6', 932, 15, 10000001);
 * 
 *  let { ingredients, itemsToBuy } = mintParamsBuilder.build();
 * 
 *  ==================================
 *      ComboProxy.mint(
 *          combo,
 *          to,
 *          true/false,
 *          ingredients,
 *          itemsToBuy
 *      );
 *  ==================================
 */
export function MintParamsBuilder() {
    this._frozen = false;
    this._ingredients = [];
    this._itemsToBuy = [];
}

MintParamsBuilder.prototype.use = function(collection, tokenId, amount, setId) {
    if (this._frozen) {
        throw new Error('Already frozen');
    }
    // if (!Web3Utils.isAddress(collection)) {
    //     throw new Error('Invalid collection address');
    // }

    this._ingredients.push({
        collection: collection,
        tokenId: new BN(tokenId),
        amount: new BN(amount),
        setId: new BN(setId)
    });
    return this;
}

MintParamsBuilder.prototype.buy = function(collection, tokenId, amount, setId) {
    if (this._frozen) {
        throw new Error('Already frozen');
    }
    // if (!Web3Utils.isAddress(collection)) {
    //     throw new Error('Invalid collection address');
    //}
    if (setId == 0) {
        throw new Error('setId is zero');
    }

    var item = {
        collection: collection,
        tokenId: new BN(tokenId),
        amount: new BN(amount),
        setId: new BN(setId)
    };
    this._ingredients.push(item);

    this._itemsToBuy.push({
        collection: item.collection,
        tokenId: item.tokenId,
        amount: item.amount
    });
    return this;
}

MintParamsBuilder.prototype.build = function() {
    if (this._frozen) {
        throw new Error('Already frozen');
    }
    this._frozen = true;

    this._ingredients.sort((a, b) => {
        let sa = a.collection.toLowerCase();
        let sb = b.collection.toLowerCase();
        if (sa < sb) {
            return -1;
        }
        if (sa > sb) {
            return 1;
        }

        let result = a.tokenId.cmp(b.tokenId);
        if (result != 0) {
            return result;
        }
        return a.setId.cmp(b.setId);
    });

    // ingredients
    var ingredients = {
        collections: [],
        itemsForCollections: [],
        amountsForItems: [],
        setsForItems: [],
    };

    let lastCollection = '';
    let batch = {};
    for (let item of this._ingredients) {
        if (item.collection.toLowerCase() != lastCollection.toLowerCase()) {
            if (lastCollection != '') {
                ingredients.collections.push(lastCollection);
                ingredients.itemsForCollections.push(batch.tokenIds);
                ingredients.amountsForItems.push(batch.amounts);
                ingredients.setsForItems.push(batch.setIds);
            }
            batch = {
                tokenIds: [],
                amounts: [],
                setIds: []
            }
            lastCollection = item.collection;
        }
        batch.tokenIds.push(item.tokenId.toString());
        batch.amounts.push(item.amount.toString());
        batch.setIds.push(item.setId.toString());
    }
    if (lastCollection != '') {
        ingredients.collections.push(lastCollection);
        ingredients.itemsForCollections.push(batch.tokenIds);
        ingredients.amountsForItems.push(batch.amounts);
        ingredients.setsForItems.push(batch.setIds);
    }

    // itemsToBuy
    var itemsToBuy = {
        collections: [],
        tokenIds: [],
        amounts: [],
    };

    lastCollection = '';
    batch = {};
    for (let item of this._itemsToBuy) {
        if (item.collection.toLowerCase() != lastCollection.toLowerCase()) {
            if (lastCollection != '') {
                itemsToBuy.collections.push(lastCollection);
                itemsToBuy.tokenIds.push(batch.tokenIds);
                itemsToBuy.amounts.push(batch.amounts);
            }
            batch = {
                tokenIds: [],
                amounts: []
            }
            lastCollection = item.collection;
        }
        batch.tokenIds.push(item.tokenId.toString());
        batch.amounts.push(item.amount.toString());
    }
    if (lastCollection != '') {
        itemsToBuy.collections.push(lastCollection);
        itemsToBuy.tokenIds.push(batch.tokenIds);
        itemsToBuy.amounts.push(batch.amounts);
    }

    return {ingredients, itemsToBuy};
}

// ===============================================================

/**
 * 
 * Usage:
 * 
 *  let comboRuleBuilder = new ComboRuleBuilder();
 * 
 *  comboRuleBuilder.addCollectionRule('0x727cB81C955e1D....dfDFe07281', true, 0, 10);
 *  comboRuleBuilder.addCollectionRule('0xF27B8D220249fb....A6a71914E2', true, 0, 10);
 * 
 *  comboRuleBuilder.addSetRule(10000000, true, 10, '1231231242412.....234');
 * 
 *  comboRuleBuilder.addLimitRule('0x727cB81C955e1D....dfDFe07281', 1);
 * 
 *  let comboRule = comboRuleBuilder.build();
 * 
 *  ==================================
 *      ComboFactory.createCombo(
 *          name,
 *          symbol,
 *          contractMetaHash,
 *          mintFee,
 *          comboRule
 *      );
 *  ==================================
 */
export function ComboRuleBuilder() {
    this._collectionRules = [];
    this._setRules = [];
    this._limitRules = [];
}

/**
 * Optional
 * 
 * @param {address} collection Specify NFT collection, repeat additions are not allowed.
 * @param {boolean} lock Whether NFTs from the specified collection should be locked or not.
 * @param {number} min [0, Uint128_MAX] The minimum number of NFTs from the specified collection in a combo mint. 
 * @param {number} max [min, Uint128_MAX] The maximum number of NFTs from the specified collection in a combo mint. 
 */
ComboRuleBuilder.prototype.addCollectionRule = function(collection, lock, min, max) {
    // if (!Web3Utils.isAddress(collection)) {
    //     throw new Error('Invalid collection address');
    // }

    if (typeof lock != 'boolean') {
        throw new Error('Param \'lock\' not a boolean');
    }

    min = new BN(min);
    max = new BN(max);
    if (min.cmp(max) > 0) {
        throw new Error('Param \'min\' greater than \'max\'');
    }

    for (let rule of this._collectionRules) {
        if (rule.collection.toLowerCase() == collection.toLowerCase()) {
            throw new Error('Duplicate collections');
        }
    }
    this._collectionRules.push({
        max: max.toString(),
        min: min.toString(),
        collection: collection,
        setId: 0,
        lock: lock,
    });
    return this;
}

/**
 * Optional
 * 
 * @param {unsigned} setId Specify set, repeat additions are not allowed.
 * @param {boolean} lock Whether NFTs from the specified set should be locked or not.
 * @param {number} min [0, Uint128_MAX] The minimum number of NFTs from the specified set in a combo mint.
 * @param {number} max [min, Uint128_MAX] The maximum number of NFTs from the specified set in a combo mint.
 */
ComboRuleBuilder.prototype.addSetRule = function(setId, lock, min, max) {
    if (setId <= 0) {
        throw new Error('Invalid set id');
    }

    if (typeof lock != 'boolean') {
        throw new Error('Param \'lock\' not a boolean');
    }

    min = new BN(min);
    max = new BN(max);
    if (min.cmp(max) > 0) {
        throw new Error('Param \'min\' greater than \'max\'');
    }

    for (let rule of this._setRules) {
        if (rule.setId == setId) {
            throw new Error('Duplicate set id');
        }
    }

    this._setRules.push({
        max: max.toString(),
        min: min.toString(),
        collection: '0x0000000000000000000000000000000000000000',
        setId: setId,
        lock: lock,
    });
    return this;
}

/**
 * Optional
 * 
 * @param {address} collection Which collection's token will be limited, must be ERC721.
 * @param {number} maxUsage (0, ∞) The maximum number of times the same NFT(token id) can be used in the combo collection.
 */
ComboRuleBuilder.prototype.addLimitRule = function(collection, maxUsage) {
    // if (!Web3Utils.isAddress(collection)) {
    //     throw new Error('Invalid collection address');
    // }
    maxUsage = new BN(maxUsage);
    if (maxUsage.cmpn(0) <= 0) {
        throw new Error('Invalid maxUsage');
    }
    for (let rule of this._limitRules) {
        if (rule.collection.toLowerCase() == collection.toLowerCase()) {
            throw new Error('Duplicate collections');
        }
    }
    this._limitRules.push({
        collection: collection,
        maxTokenUsage: maxUsage.toString(),
    });
    return this;
}

ComboRuleBuilder.prototype.build = function() {
    this._collectionRules.sort((a, b) => {
        return a.collection.toLowerCase() > b.collection.toLowerCase() ? 1 : -1;
    });
    this._setRules.sort((a, b) => {
        return a.setId > b.setId ? 1 : -1;
    });
    this._limitRules.sort((a, b) => {
        return a.collection.toLowerCase() > b.collection.toLowerCase() ? 1 : -1;
    });

    if (this._collectionRules.length == 0 && this._setRules.length == 0) {
        throw new Error("At least one collection/set rule is required");
    }

    return {
        factors: this._collectionRules.concat(this._setRules),
        limits: this._limitRules,
    };
};

/**
 * 
 * Usage:
 * 
 *  let mintAddOnBuilder = new MintAddOnBuilder();
 * 
 *  // purchase 15 add-ons with id 932
 *  mintAddOnBuilder.add('0x10c01D6B0396D9....F60b9cB1F6', 932, 15);
 * 
 *  let items = mintAddOnBuilder.build();
 * 
 *  ==================================
 *      CollectionProxy.mint(
 *          to,
 *          true/false,
 *          items
 *      );
 *  ==================================
 */
export function MintAddOnBuilder() {
    this._frozen = false;
    this._itemsToBuy = [];
}

/**
 * 
 * @param {address} collection Address of add-on collection.
 * @param {number|string} tokenId Token id to purchase.
 * @param {number|string} amount
 * @returns 
 */
MintAddOnBuilder.prototype.add = function(collection, tokenId, amount) {
    if (this._frozen) {
        throw new Error('Already frozen');
    }
    // if (!Web3Utils.isAddress(collection)) {
    //     throw new Error('Invalid collection address');
    // }

    this._itemsToBuy.push({
        collection: collection,
        tokenId: new BN(tokenId),
        amount: new BN(amount),
    });
    return this;
}


MintAddOnBuilder.prototype.build = function() {
    if (this._frozen) {
        throw new Error('Already frozen');
    }
    this._frozen = true;

    this._itemsToBuy.sort((a, b) => {
        let sa = a.collection.toLowerCase();
        let sb = b.collection.toLowerCase();
        if (sa < sb) {
            return -1;
        }
        if (sa > sb) {
            return 1;
        }

        return a.tokenId.cmp(b.tokenId);
    });

    var itemsToBuy = {
        collections: [],
        tokenIds: [],
        amounts: [],
    };

    let lastCollection = '';
    let batch = {};
    for (let item of this._itemsToBuy) {
        if (item.collection.toLowerCase() != lastCollection.toLowerCase()) {
            if (lastCollection != '') {
                itemsToBuy.collections.push(lastCollection);
                itemsToBuy.tokenIds.push(batch.tokenIds);
                itemsToBuy.amounts.push(batch.amounts);
            }
            batch = {
                tokenIds: [],
                amounts: []
            }
            lastCollection = item.collection;
        }
        batch.tokenIds.push(item.tokenId.toString());
        batch.amounts.push(item.amount.toString());
    }
    if (lastCollection != '') {
        itemsToBuy.collections.push(lastCollection);
        itemsToBuy.tokenIds.push(batch.tokenIds);
        itemsToBuy.amounts.push(batch.amounts);
    }

    return itemsToBuy;
}

// module.exports = {
//     MintParamsBuilder,
//     MintAddOnBuilder,
//     ComboRuleBuilder,
// };