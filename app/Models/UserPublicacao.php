<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserPublicacao extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'users_publicacoes';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        
    ];

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'id';

    /**
     * The relationships that should always be loaded.
     *
     * @var array
     */
    protected $with = ['tipo_publicacao', 'subunidade', 'user'];

     public function subunidade()
    {
        return $this->belongsTo(Subunidade::class);
    }

     public function user()
    {
        return $this->belongsTo(User::class)->without(['perfil', 'setor', 'subunidade']);
    }

    public function tipo_publicacao()
    {
        return $this->belongsTo(TipoPublicacao::class,'tipo_publicacao_id');
    }

}
