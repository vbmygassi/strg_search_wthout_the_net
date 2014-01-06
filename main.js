Couch = require( "couchbase" );
Elast = require( "elastical" );

Storage = {
	bucket: null,
	connect: function( cb ) {
		Couch.connect( { hosts: [ "127.0.0.1" ], bucket: "default" }, onConnect = function( err, bucket ){
			if( err ){
				console.log( "err:", err );
			}
			if( bucket ){
				Storage.bucket = bucket;
				cb( Storage );
			}
		});
	}
};

Search = {
	client: null,
	init: function( cb ){
		Search.client = new Elast.Client( "127.0.0.1", { port: 9200 } );
		cb( Search );
	},
	ii: function( cb ){
		Search.client.index( "blog", "post", { title: "fuck" }, function( err, res ) { 
			if( err ) {
				console.log( "err", err );
			}
			if( res) {	
				cb( res );
			}
		});
	},
	is: function( cb ) {
		Search.client.search( { query: "fuck", index: "blog" }, function( err, res ){
			if( err ){
				console.log( "err:", err );
			}
			if( res ){	
				console.log( "res:", res );
				doc = null;
				while( doc = res.hits.pop() ){
					console.log( "doc._id:", doc._id );
					console.log( "doc._source:", doc._source );
				}
			}
		} );
	},
	ig: function( cb ) {
		Search.client.get( "blog", "GW2ah8x5TWKNFEIAvqkgPw", function( err, doc, res ){
			if( err ){
				console.log( "err:", err );
			}
			if( res ){
				console.log( "res:", res );
				console.log( "res._source:", doc._source );
			}
			// ? doc
		});
	}
};

Storage.connect( function( res ) {
	console.log( "Storage.connect:res::", res );
	Search.init( function( res ){
		console.log( "Search.init:res::", res );
		Search.ii( function( res ) {
			console.log( "Search.ii:res::", res);
		});
	});
});


